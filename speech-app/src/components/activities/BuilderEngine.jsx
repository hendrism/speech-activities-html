import { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable, DragOverlay } from '@dnd-kit/core';
import { Settings, RotateCcw, Check } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

// --- Draggable Item ---
function DraggableItem({ id, text, type, isDragging }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        data: { text, type }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    // Dynamic styling based on type (can be customized via props later)
    const typeColors = {
        noun: 'bg-blue-500 border-blue-600',
        verb: 'bg-green-500 border-green-600',
        adjective: 'bg-purple-500 border-purple-600',
        default: 'bg-slate-600 border-slate-700'
    };

    const colorClass = typeColors[type] || typeColors.default;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={clsx(
                "px-4 py-2 rounded-lg text-white font-bold shadow-sm border-b-4 cursor-grab active:cursor-grabbing transition-colors select-none",
                colorClass,
                isDragging ? "opacity-0" : "opacity-100"
            )}
        >
            {text}
        </div>
    );
}

// --- Droppable Slot ---
function DroppableSlot({ id, type, filledItem, onRemove, placeholder }) {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
        data: { type }
    });

    const typeColors = {
        noun: 'border-blue-300 bg-blue-50 text-blue-700',
        verb: 'border-green-300 bg-green-50 text-green-700',
        adjective: 'border-purple-300 bg-purple-50 text-purple-700',
        default: 'border-slate-300 bg-slate-50 text-slate-700'
    };

    const colorClass = typeColors[type] || typeColors.default;

    if (filledItem) {
        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={onRemove}
                className={clsx(
                    "px-4 py-2 rounded-lg font-bold border-2 cursor-pointer hover:opacity-80 transition-all select-none",
                    colorClass
                )}
            >
                {filledItem.text}
            </motion.div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            className={clsx(
                "min-w-[120px] h-11 border-2 border-dashed rounded-lg flex items-center justify-center transition-all duration-200",
                isOver ? "bg-yellow-50 border-yellow-400 scale-105 shadow-inner" : colorClass
            )}
        >
            <span className="text-xs uppercase font-bold opacity-40">{placeholder || type}</span>
        </div>
    );
}

// --- Main Engine Component ---
export default function BuilderEngine({ data, config }) {
    // Config defaults
    const {
        title = "Builder Activity",
        instructions = "Drag the items to the correct spots.",
        setupConfig = null // If present, shows setup screen first
    } = config || {};

    // State
    const [isSetupComplete, setIsSetupComplete] = useState(!setupConfig);
    const [setupState, setSetupState] = useState({}); // Stores selections from setup
    const [items, setItems] = useState([]); // Available draggable items
    const [slots, setSlots] = useState([]); // Places to drop items
    const [filledSlots, setFilledSlots] = useState({}); // { slotId: itemObject }
    const [activeId, setActiveId] = useState(null); // For DragOverlay

    // Initialize Data (runs when setup is complete or if no setup needed)
    useEffect(() => {
        if (isSetupComplete) {
            // If we have a data generator function (like for Articulation), use it
            if (typeof data.generateItems === 'function') {
                const generated = data.generateItems(setupState);
                setItems(generated.items);
                setSlots(generated.slots);
            } else {
                // Otherwise use static data
                setItems(data.items || []);
                setSlots(data.slots || []);
            }
        }
    }, [isSetupComplete, data, setupState]);

    // --- Handlers ---
    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (over) {
            const item = items.find(i => i.id === active.id);
            const slotType = over.data.current?.type;

            // Type checking (if strict mode is on, or just default behavior)
            if (!slotType || item.type === slotType || slotType === 'any') {
                setFilledSlots(prev => ({
                    ...prev,
                    [over.id]: item
                }));
            } else {
                // Optional: Error feedback
            }
        }
    };

    const handleRemoveItem = (slotId) => {
        setFilledSlots(prev => {
            const newFilled = { ...prev };
            delete newFilled[slotId];
            return newFilled;
        });
    };

    const handleReset = () => {
        setFilledSlots({});
        if (setupConfig) setIsSetupComplete(false);
    };

    // --- Render Setup Screen ---
    if (!isSetupComplete && setupConfig) {
        return (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                        <Settings size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Activity Setup</h2>
                    <p className="text-slate-600">Customize your activity</p>
                </div>

                {/* Render Setup Component passed via config */}
                {setupConfig.render({
                    state: setupState,
                    setState: setSetupState,
                    onComplete: () => setIsSetupComplete(true)
                })}
            </div>
        );
    }

    // --- Render Activity ---
    const activeItem = items.find(i => i.id === activeId);

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">

                {/* Left: Item Bank (3 cols) */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-700">Items</h3>
                            <button
                                onClick={handleReset}
                                className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1"
                            >
                                <RotateCcw size={12} /> Reset
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {items.map(item => (
                                <DraggableItem
                                    key={item.id}
                                    id={item.id}
                                    text={item.text}
                                    type={item.type}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Workspace (9 cols) */}
                <div className="lg:col-span-9 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">{title}</h2>
                        <p className="text-slate-600 mb-6">{instructions}</p>

                        <div className="space-y-4">
                            {slots.map(slot => (
                                <div key={slot.id} className="flex items-center gap-3 flex-wrap p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    {/* Slot Template Rendering */}
                                    {/* This allows mixing text and slots, e.g. "The [slot] ran." */}
                                    {slot.template ? (
                                        slot.template.map((part, idx) => {
                                            if (part.isSlot) {
                                                return (
                                                    <DroppableSlot
                                                        key={`${slot.id}-part-${idx}`}
                                                        id={`${slot.id}`} // Simple 1-slot per row for now, can expand
                                                        type={part.type}
                                                        placeholder={part.placeholder}
                                                        filledItem={filledSlots[slot.id]}
                                                        onRemove={() => handleRemoveItem(slot.id)}
                                                    />
                                                );
                                            }
                                            return <span key={idx} className="text-lg text-slate-700">{part.text}</span>;
                                        })
                                    ) : (
                                        // Fallback simple slot
                                        <DroppableSlot
                                            id={slot.id}
                                            type={slot.type}
                                            filledItem={filledSlots[slot.id]}
                                            onRemove={() => handleRemoveItem(slot.id)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Drag Overlay */}
            <DragOverlay>
                {activeId ? (
                    <div className={clsx(
                        "px-4 py-2 rounded-lg text-white font-bold shadow-lg border-b-4",
                        // Duplicate color logic for overlay
                        activeItem.type === 'noun' ? 'bg-blue-500 border-blue-600' :
                            activeItem.type === 'verb' ? 'bg-green-500 border-green-600' :
                                activeItem.type === 'adjective' ? 'bg-purple-500 border-purple-600' :
                                    'bg-slate-600 border-slate-700'
                    )}>
                        {activeItem.text}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
