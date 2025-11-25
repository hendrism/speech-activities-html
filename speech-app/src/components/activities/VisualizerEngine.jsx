import { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable, DragOverlay } from '@dnd-kit/core';
import { Check, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

// --- Draggable Card ---
function DraggableCard({ id, text, isDragging }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        data: { text }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={clsx(
                "bg-white p-3 rounded-lg shadow-sm border-2 border-slate-200 cursor-grab active:cursor-grabbing text-sm font-medium transition-all select-none",
                isDragging ? "opacity-0" : "opacity-100 hover:border-blue-400 hover:shadow-md"
            )}
        >
            {text}
        </div>
    );
}

// --- Drop Zone ---
function DropZone({ id, title, emoji, items, isOver, children, className }) {
    const { setNodeRef } = useDroppable({
        id: id
    });

    return (
        <div
            ref={setNodeRef}
            className={clsx(
                "flex flex-col h-full transition-colors duration-200 rounded-2xl border-2 p-4",
                isOver ? "bg-blue-50 border-blue-400" : "bg-slate-50 border-slate-200",
                className
            )}
        >
            <div className="text-center mb-4">
                <div className="text-3xl mb-1">{emoji}</div>
                <div className="font-bold text-slate-700">{title}</div>
            </div>

            <div className="flex-1 space-y-2 min-h-[150px]">
                {children}
            </div>
        </div>
    );
}

// --- Main Engine ---
export default function VisualizerEngine({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [items, setItems] = useState([]); // All items
    const [placements, setPlacements] = useState({ left: [], middle: [], right: [], bank: [] });
    const [activeId, setActiveId] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const activity = data[currentIndex];

    // Initialize
    useEffect(() => {
        const allItems = activity.items.map(i => ({ ...i }));
        setItems(allItems);
        setPlacements({
            left: [],
            middle: [],
            right: [],
            bank: allItems.map(i => i.id)
        });
        setFeedback(null);
    }, [currentIndex, activity]);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (over) {
            const itemId = active.id;
            const targetZone = over.id;

            // Remove from old zone
            const newPlacements = { ...placements };
            Object.keys(newPlacements).forEach(zone => {
                newPlacements[zone] = newPlacements[zone].filter(id => id !== itemId);
            });

            // Add to new zone
            newPlacements[targetZone].push(itemId);
            setPlacements(newPlacements);
        }
    };

    const handleCheck = () => {
        const currentItems = activity.items;
        let correctCount = 0;
        let mistakes = [];

        // Check Left
        placements.left.forEach(id => {
            const item = currentItems.find(i => i.id === id);
            if (item.zone === 'left') correctCount++;
            else mistakes.push(`"${item.text}" belongs in a different spot.`);
        });

        // Check Middle
        placements.middle.forEach(id => {
            const item = currentItems.find(i => i.id === id);
            if (item.zone === 'middle') correctCount++;
            else mistakes.push(`"${item.text}" belongs in a different spot.`);
        });

        // Check Right
        placements.right.forEach(id => {
            const item = currentItems.find(i => i.id === id);
            if (item.zone === 'right') correctCount++;
            else mistakes.push(`"${item.text}" belongs in a different spot.`);
        });

        // Check Bank (unplaced)
        if (placements.bank.length > 0) {
            mistakes.push("You still have items in the bank!");
        }

        if (correctCount === currentItems.length && placements.bank.length === 0) {
            setFeedback({ type: 'success', message: 'Perfect! All items are correctly placed.' });
        } else {
            setFeedback({ type: 'error', message: mistakes[0] || "Keep trying!" });
        }
    };

    const handleReset = () => {
        setPlacements({
            left: [],
            middle: [],
            right: [],
            bank: activity.items.map(i => i.id)
        });
        setFeedback(null);
    };

    const activeItem = items.find(i => i.id === activeId);

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header / Nav */}
                <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                    <button
                        onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentIndex === 0}
                        className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-30"
                    >
                        <ChevronLeft />
                    </button>

                    <div className="text-center">
                        <h2 className="text-xl font-bold text-slate-800">{activity.title}</h2>
                        <span className="text-sm text-slate-500">{activity.context}</span>
                    </div>

                    <button
                        onClick={() => setCurrentIndex(prev => Math.min(data.length - 1, prev + 1))}
                        disabled={currentIndex === data.length - 1}
                        className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-30"
                    >
                        <ChevronRight />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left: Item Bank */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sticky top-24">
                            <h3 className="font-bold text-slate-700 mb-4 text-center">Idea Bank</h3>
                            <DropZone id="bank" title="" emoji="" isOver={false} className="border-dashed min-h-[300px]">
                                {placements.bank.map(id => {
                                    const item = items.find(i => i.id === id);
                                    return <DraggableCard key={id} id={id} text={item.text} />;
                                })}
                            </DropZone>
                        </div>
                    </div>

                    {/* Right: Visualizer */}
                    <div className="lg:col-span-9 space-y-6">

                        {/* Bubbles */}
                        <div className="grid grid-cols-3 gap-4">
                            <DropZone
                                id="left"
                                title={activity.left.label}
                                emoji={activity.left.emoji}
                                className="bg-red-50 border-red-200"
                            >
                                {placements.left.map(id => {
                                    const item = items.find(i => i.id === id);
                                    return <DraggableCard key={id} id={id} text={item.text} />;
                                })}
                            </DropZone>

                            <DropZone
                                id="middle"
                                title="Both"
                                emoji="🤝"
                                className="bg-green-50 border-green-200"
                            >
                                {placements.middle.map(id => {
                                    const item = items.find(i => i.id === id);
                                    return <DraggableCard key={id} id={id} text={item.text} />;
                                })}
                            </DropZone>

                            <DropZone
                                id="right"
                                title={activity.right.label}
                                emoji={activity.right.emoji}
                                className="bg-blue-50 border-blue-200"
                            >
                                {placements.right.map(id => {
                                    const item = items.find(i => i.id === id);
                                    return <DraggableCard key={id} id={id} text={item.text} />;
                                })}
                            </DropZone>
                        </div>

                        {/* Controls & Feedback */}
                        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCheck}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <Check size={18} /> Check
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors flex items-center gap-2"
                                >
                                    <RotateCcw size={18} /> Reset
                                </button>
                            </div>

                            {feedback && (
                                <div className={clsx(
                                    "px-4 py-2 rounded-lg font-bold text-sm",
                                    feedback.type === 'success' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                )}>
                                    {feedback.message}
                                </div>
                            )}
                        </div>

                        {/* Writing Frame */}
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                            <h3 className="font-bold text-slate-700 mb-4">Compare & Contrast Summary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <textarea
                                    className="w-full p-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none min-h-[100px]"
                                    placeholder={`Both ${activity.left.label} and ${activity.right.label} are alike because...`}
                                />
                                <textarea
                                    className="w-full p-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none min-h-[100px]"
                                    placeholder={`${activity.left.label} and ${activity.right.label} are different because...`}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                <DragOverlay>
                    {activeId ? (
                        <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-blue-500 font-bold opacity-90 rotate-3">
                            {activeItem?.text}
                        </div>
                    ) : null}
                </DragOverlay>

            </div>
        </DndContext>
    );
}
