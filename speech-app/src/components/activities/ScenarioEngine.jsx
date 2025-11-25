import { useState } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb, Scale, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

// --- Hint Component ---
function HintSection({ hints }) {
    const [activeHint, setActiveHint] = useState(null);

    return (
        <div className="mt-4 space-y-4">
            <div className="flex flex-wrap gap-2">
                {['hint1', 'hint2', 'hint3', 'hint4'].map((key, idx) => (
                    <button
                        key={key}
                        onClick={() => setActiveHint(activeHint === key ? null : key)}
                        className={clsx(
                            "px-3 py-2 rounded-lg text-sm font-bold border-2 transition-all flex items-center gap-2",
                            activeHint === key
                                ? "bg-orange-50 border-orange-400 text-orange-700"
                                : "bg-white border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600"
                        )}
                    >
                        <Lightbulb size={16} />
                        Hint {idx + 1}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeHint && hints[activeHint] && (
                    <motion.div
                        key={activeHint}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg"
                    >
                        <h4 className="font-bold text-orange-800 mb-2">{hints[activeHint].title}</h4>
                        {hints[activeHint].content && (
                            <p className="text-orange-900 mb-2">{hints[activeHint].content}</p>
                        )}
                        {hints[activeHint].list && (
                            <ul className="list-disc list-inside space-y-1 text-orange-900">
                                {hints[activeHint].list.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- Solution Section ---
function SolutionSection({ number, title, hints }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {number}
                </div>
                <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                        What is one way you could solve this problem?
                    </label>
                    <textarea
                        className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors min-h-[100px]"
                        placeholder="Describe your solution here..."
                    />
                </div>

                <HintSection hints={hints} />

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                        🔮 What might happen if you use this solution? (Predict the outcome)
                    </label>
                    <textarea
                        className="w-full p-4 border-2 border-blue-100 bg-blue-50 rounded-xl focus:border-blue-500 focus:outline-none transition-colors min-h-[80px]"
                        placeholder="If I do this, then..."
                    />
                </div>
            </div>
        </div>
    );
}

// --- Main Engine ---
export default function ScenarioEngine({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scenario = data[currentIndex];

    const handleNext = () => {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">

            {/* Navigation */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>

                <span className="font-bold text-slate-700">
                    Problem {currentIndex + 1} of {data.length}
                </span>

                <button
                    onClick={handleNext}
                    disabled={currentIndex === data.length - 1}
                    className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Problem Display */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                >
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-8 text-white shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">{scenario.title}</h2>
                        <p className="text-xl leading-relaxed font-medium opacity-95">
                            {scenario.text}
                        </p>
                    </div>

                    <SolutionSection
                        number={1}
                        title="Solution #1"
                        hints={scenario.hints.solution1}
                    />

                    <SolutionSection
                        number={2}
                        title="Solution #2 (Different Approach)"
                        hints={scenario.hints.solution2}
                    />

                    {/* Comparison */}
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                            <Scale size={24} />
                            Compare: Which solution would you choose and why?
                        </h3>
                        <textarea
                            className="w-full p-4 border-2 border-green-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors min-h-[120px]"
                            placeholder="Looking at both solutions and their outcomes, which one would you actually use? Explain your reasoning..."
                        />
                    </div>

                </motion.div>
            </AnimatePresence>

        </div>
    );
}
