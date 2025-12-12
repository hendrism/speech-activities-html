import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle, Brain, Target, Clock, MessageCircle, Book, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressiveHelp from './ProgressiveHelp';
import clsx from 'clsx';

// Module Icons mapping
const MODULE_ICONS = {
    literal: Target,
    inferential: Brain,
    future: Clock,
    retell: MessageCircle,
    definitions: Book,
    synonyms: PenTool,
    questions: Target
};

const MODULE_LABELS = {
    literal: "Literal",
    inferential: "Inferential",
    future: "Future Tense",
    retell: "Retell",
    definitions: "Definitions",
    synonyms: "Synonyms",
    questions: "Questions"
};

// --- Sub-Components for Different Module Types ---

function QuizModule({ items, type }) {
    if (!items || items.length === 0) return <div>No questions available.</div>;

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6">
                <h3 className="font-bold text-blue-800 flex items-center gap-2">
                    {MODULE_ICONS[type] && React.createElement(MODULE_ICONS[type], { size: 18 })}
                    {MODULE_LABELS[type] || type} Questions
                </h3>
                <p className="text-blue-600 text-sm">Answer the questions based on the story.</p>
            </div>
            {items.map((item, idx) => (
                <QuizQuestion key={idx} item={item} index={idx} type={type} />
            ))}
        </div>
    );
}

function QuizQuestion({ item, index, type }) {
    const [helpLevel, setHelpLevel] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);

    // Normalize data structure: some use 'q', others 'word'/'context'
    const questionText = item.q || item.word;
    const contextText = item.context; // for vocab

    // Memoize options
    const [options] = useState(() =>
        [item.correct, ...(item.wrong || ((item.choices || []).filter(c => c !== item.correct)))].sort(() => Math.random() - 0.5)
    );

    // Determine correct answer getter
    const getCorrect = () => item.correct || (item.choices && item.choices[0]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h4 className="text-lg font-bold text-slate-800 mb-2 flex gap-3">
                <span className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-colors",
                    isCorrect ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                )}>
                    {isCorrect ? <CheckCircle size={18} /> : index + 1}
                </span>
                <span className="capitalize">{questionText}</span>
            </h4>

            {contextText && (
                <p className="text-slate-600 italic ml-11 mb-4 border-l-2 border-slate-200 pl-3">
                    "{contextText}"
                </p>
            )}

            <ProgressiveHelp
                item={item}
                helpLevel={helpLevel}
                setHelpLevel={setHelpLevel}
                getOptions={() => options}
                getCorrectAnswer={getCorrect}
                hintTemplate={() => "Check the text or think about the meaning."}
                onCorrect={() => setIsCorrect(true)}
                onIncorrect={() => { }}
            />
        </div>
    );
}

function RetellModule({ items }) {
    if (!items || items.length === 0) return <div>No retelling structure available.</div>;

    const [inputs, setInputs] = useState({});

    const handleInput = (slot, value) => {
        setInputs(prev => ({ ...prev, [slot]: value }));
    };

    const slots = {
        character: inputs.character || "______",
        want: inputs.want || "______",
        problem: inputs.problem || "______",
        solution: inputs.solution || "______",
        result: inputs.result || "______"
    };

    return (
        <div className="space-y-8">
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <h3 className="font-bold text-purple-800 flex items-center gap-2">
                    <MessageCircle size={18} />
                    Retell Builder
                </h3>
                <p className="text-purple-600 text-sm">Build the story summary step-by-step.</p>
            </div>

            {/* Generated Summary Card */}
            <div className="bg-slate-800 text-slate-50 p-6 rounded-xl shadow-md border-l-4 border-purple-400">
                <h4 className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-2">Your Summary</h4>
                <p className="text-lg leading-relaxed">
                    <span className="font-bold text-purple-300">{slots.character}</span> wanted to <span className="font-bold text-purple-300">{slots.want}</span>, but <span className="font-bold text-purple-300">{slots.problem}</span>, so <span className="font-bold text-purple-300">{slots.solution}</span>. Then <span className="font-bold text-purple-300">{slots.result}</span>.
                </p>
            </div>

            <div className="space-y-6">
                {items.map((item, idx) => (
                    <RetellItem
                        key={idx}
                        item={item}
                        index={idx}
                        value={inputs[item.slot] || ''}
                        onChange={(val) => handleInput(item.slot, val)}
                    />
                ))}
            </div>
        </div>
    );
}

function RetellItem({ item, index, value, onChange }) {
    const [helpLevel, setHelpLevel] = useState(0);

    // For Retell, options are choices provided in data
    const [options] = useState(() =>
        (item.choices ? [...item.choices] : []).sort(() => Math.random() - 0.5)
    );

    // Helper: Choosing an option populates the input
    const handleOptionSelect = (text) => {
        onChange(text);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-bold text-slate-500 uppercase tracking-wide mb-1">
                {item.slot}
            </label>
            <h4 className="text-lg font-bold text-slate-800 mb-4">{item.prompt}</h4>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full p-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none min-h-[80px] text-slate-700 font-medium"
            />

            <div className="mt-4">
                <ProgressiveHelp
                    item={item}
                    helpLevel={helpLevel}
                    setHelpLevel={setHelpLevel}
                    getOptions={() => options}
                    // Retell doesn't strictly have ONE correct answer for UI purpose here, 
                    // but we treat the first choice as "ideal" or just use options as suggestions.
                    // We'll override the rendering to purely selectable options that fill text.
                    customRenderOptions={(opts) => (
                        <div className="grid grid-cols-1 gap-2 mt-3">
                            {opts.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleOptionSelect(opt)}
                                    className="text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-blue-300 transition-all text-slate-700 active:bg-blue-50 font-medium"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                    hintTemplate={() => item.hint}
                />
            </div>
        </div>
    );
}


// --- Main Component ---

export default function StoryEngine({ data }) {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const story = data[currentStoryIndex];

    // Detect available modules in the current story
    const modules = useMemo(() => {
        const keys = Object.keys(story);
        const allowed = ['questions', 'literal', 'inferential', 'future', 'retell', 'definitions', 'synonyms'];
        return allowed.filter(k => keys.includes(k) && story[k] && story[k].length > 0);
    }, [story]);

    // Active module state
    const [activeModule, setActiveModule] = useState(modules[0] || 'literal');

    // Reset active module when story changes
    useEffect(() => {
        const newModules = Object.keys(data[currentStoryIndex]).filter(
            k => ['questions', 'literal', 'inferential', 'future', 'retell', 'definitions', 'synonyms'].includes(k)
        );
        // Only if current active module is NOT in the new story's modules
        if (!newModules.includes(activeModule)) {
            setActiveModule(newModules[0] || 'questions');
        }
    }, [currentStoryIndex, data, activeModule]);


    const handleNext = () => {
        if (currentStoryIndex < data.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrev = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Column: Story Text (5/12 width) */}
            <div className="lg:col-span-5 space-y-6">
                {/* Navigation */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center justify-between sticky top-24 z-10">
                    <button
                        onClick={handlePrev}
                        disabled={currentStoryIndex === 0}
                        className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="flex items-center gap-2 font-bold text-slate-700">
                        <BookOpen size={20} className="text-blue-500" />
                        <span>Story {currentStoryIndex + 1} of {data.length}</span>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={currentStoryIndex === data.length - 1}
                        className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Story Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStoryIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl shadow-sm border-l-4 border-orange-400 p-8"
                    >
                        {story.image && (
                            <div className="mb-6 rounded-xl overflow-hidden border border-slate-200">
                                <img
                                    src={story.image}
                                    alt={story.alt || story.title}
                                    className="w-full h-auto object-cover max-h-64"
                                />
                            </div>
                        )}
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">{story.title}</h2>
                        <div className="space-y-4 text-lg leading-relaxed text-slate-700 font-medium">
                            {story.text.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Right Column: Dynamic Modules (7/12 width) */}
            <div className="lg:col-span-7 space-y-6">

                {/* Module Selector (Tabs) */}
                <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
                    {modules.map(modKey => {
                        const Icon = MODULE_ICONS[modKey] || Target;
                        const isActive = activeModule === modKey;
                        return (
                            <button
                                key={modKey}
                                onClick={() => setActiveModule(modKey)}
                                className={clsx(
                                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all",
                                    isActive
                                        ? "bg-slate-800 text-white shadow-md ring-2 ring-slate-200 ring-offset-2"
                                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                )}
                            >
                                <Icon size={16} />
                                {MODULE_LABELS[modKey] || modKey}
                            </button>
                        );
                    })}
                </div>

                {/* Module Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${currentStoryIndex}-${activeModule}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeModule === 'retell' ? (
                            <RetellModule items={story.retell} />
                        ) : activeModule === 'definitions' || activeModule === 'synonyms' ? (
                            <QuizModule items={story[activeModule]} type={activeModule} />
                        ) : (
                            <QuizModule items={story[activeModule]} type={activeModule} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    );
}
