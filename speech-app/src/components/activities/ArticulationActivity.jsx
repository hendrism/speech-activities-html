import { useState } from 'react';
import { DndContext, useDraggable, useDroppable, DragOverlay } from '@dnd-kit/core';
import { Settings, CheckCircle, RotateCcw } from 'lucide-react';
import clsx from 'clsx';

// Draggable Word Component
function DraggableWord({ id, text, pos }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
        data: { text, pos }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    const posColors = {
        noun: 'bg-blue-500 border-blue-600',
        verb: 'bg-green-500 border-green-600',
        adjective: 'bg-purple-500 border-purple-600'
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={clsx(
                "px-4 py-2 rounded-lg text-white font-bold shadow-sm border-b-4 cursor-grab active:cursor-grabbing transition-colors",
                posColors[pos] || 'bg-slate-500',
                isDragging ? "opacity-50" : "opacity-100"
            )}
        >
            {text}
        </div>
    );
}

// Droppable Blank Component
function DroppableBlank({ id, pos, filledWord, onRemove }) {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
        data: { pos }
    });

    const posColors = {
        noun: 'border-blue-300 bg-blue-50 text-blue-700',
        verb: 'border-green-300 bg-green-50 text-green-700',
        adjective: 'border-purple-300 bg-purple-50 text-purple-700'
    };

    if (filledWord) {
        return (
            <div
                onClick={onRemove}
                className={clsx(
                    "px-4 py-2 rounded-lg font-bold border-2 cursor-pointer hover:opacity-80 transition-all",
                    posColors[pos]
                )}
            >
                {filledWord.text}
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            className={clsx(
                "min-w-[100px] h-10 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors",
                isOver ? "bg-yellow-50 border-yellow-400 scale-105" : "border-slate-300 bg-slate-50",
                posColors[pos]
            )}
        >
            <span className="text-xs uppercase font-bold opacity-40">{pos}</span>
        </div>
    );
}

export default function ArticulationActivity({ data }) {
    const { articulationWordData, sentenceTemplates } = data;

    // Setup State
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBlends, setSelectedBlends] = useState([]);
    const [isSetupComplete, setIsSetupComplete] = useState(false);

    // Activity State
    const [availableWords, setAvailableWords] = useState([]);
    const [filledSentences, setFilledSentences] = useState({}); // { sentenceId: wordObject }
    const [activeId, setActiveId] = useState(null); // For DragOverlay

    // --- Setup Handlers ---
    const handleCategorySelect = (key) => {
        setSelectedCategory(key);
        setSelectedBlends([]);
    };

    const handleBlendToggle = (blend) => {
        setSelectedBlends(prev =>
            prev.includes(blend)
                ? prev.filter(b => b !== blend)
                : [...prev, blend]
        );
    };

    const startActivity = () => {
        if (!selectedCategory || selectedBlends.length === 0) return;

        // Gather words
        const categoryData = articulationWordData[selectedCategory];
        let words = [];
        selectedBlends.forEach(blend => {
            if (categoryData.blends[blend]) {
                words = words.concat(categoryData.blends[blend]);
            }
        });

        // Add unique IDs to words for DnD
        const wordsWithIds = words.map((w, i) => ({ ...w, id: `word-${i}-${w.text}` }));

        setAvailableWords(wordsWithIds);
        setIsSetupComplete(true);
    };

    // --- DnD Handlers ---
    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (over && over.data.current) {
            const word = availableWords.find(w => w.id === active.id);
            const targetPos = over.data.current.pos;

            // Validate Part of Speech (optional, but good for feedback)
            if (word.pos === targetPos) {
                setFilledSentences(prev => ({
                    ...prev,
                    [over.id]: word
                }));
            } else {
                // Maybe show error feedback?
                alert(`Try again! This blank needs a ${targetPos}.`);
            }
        }
    };

    const handleRemoveWord = (sentenceId) => {
        setFilledSentences(prev => {
            const newFilled = { ...prev };
            delete newFilled[sentenceId];
            return newFilled;
        });
    };

    // --- Render Setup ---
    if (!isSetupComplete) {
        return (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                        <Settings size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Activity Setup</h2>
                    <p className="text-slate-600">Choose your target sounds to begin</p>
                </div>

                <div className="space-y-6">
                    {/* Category Selection */}
                    <div>
                        <h3 className="font-semibold text-slate-700 mb-3">1. Select Sound Group</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(articulationWordData).map(([key, value]) => (
                                <button
                                    key={key}
                                    onClick={() => handleCategorySelect(key)}
                                    className={clsx(
                                        "p-4 rounded-xl border-2 text-left transition-all",
                                        selectedCategory === key
                                            ? "border-blue-500 bg-blue-50 text-blue-700"
                                            : "border-slate-200 hover:border-blue-300"
                                    )}
                                >
                                    <span className="font-bold">{value.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Blend Selection */}
                    {selectedCategory && (
                        <div className="animate-in fade-in slide-in-from-top-4">
                            <h3 className="font-semibold text-slate-700 mb-3">2. Select Specific Blends</h3>
                            <div className="flex flex-wrap gap-2">
                                {Object.keys(articulationWordData[selectedCategory].blends).map(blend => (
                                    <button
                                        key={blend}
                                        onClick={() => handleBlendToggle(blend)}
                                        className={clsx(
                                            "px-4 py-2 rounded-lg font-medium border-2 transition-all",
                                            selectedBlends.includes(blend)
                                                ? "border-green-500 bg-green-50 text-green-700"
                                                : "border-slate-200 hover:border-green-300"
                                        )}
                                    >
                                        {blend}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Start Button */}
                    <button
                        onClick={startActivity}
                        disabled={!selectedCategory || selectedBlends.length === 0}
                        className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-200"
                    >
                        Start Activity
                    </button>
                </div>
            </div>
        );
    }

    // --- Render Activity ---
    const activeWord = availableWords.find(w => w.id === activeId);

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

                {/* Left: Word Bank */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-700">Word Bank</h3>
                            <button
                                onClick={() => setIsSetupComplete(false)}
                                className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1"
                            >
                                <RotateCcw size={12} /> Reset
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {availableWords.map(word => (
                                <DraggableWord key={word.id} id={word.id} text={word.text} pos={word.pos} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Sentences */}
                <div className="lg:col-span-2 space-y-4">
                    {sentenceTemplates.map(sent => (
                        <div key={sent.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3 flex-wrap">
                            <span className="text-lg text-slate-700">{sent.template}</span>

                            <DroppableBlank
                                id={`sentence-${sent.id}`}
                                pos={sent.blank.pos}
                                filledWord={filledSentences[`sentence-${sent.id}`]}
                                onRemove={() => handleRemoveWord(`sentence-${sent.id}`)}
                            />

                            <span className="text-lg text-slate-700">{sent.ending}</span>
                        </div>
                    ))}
                </div>

            </div>

            {/* Drag Overlay */}
            <DragOverlay>
                {activeId ? (
                    <div className={clsx(
                        "px-4 py-2 rounded-lg text-white font-bold shadow-lg border-b-4",
                        activeWord.pos === 'noun' ? 'bg-blue-500 border-blue-600' :
                            activeWord.pos === 'verb' ? 'bg-green-500 border-green-600' :
                                'bg-purple-500 border-purple-600'
                    )}>
                        {activeWord.text}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
