import { useState } from 'react';
import { ChevronLeft, ChevronRight, Mic, Ear } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export default function ConversationEngine({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeRole, setActiveRole] = useState('fluency'); // 'fluency' or 'articulation'
    const prompt = data[currentIndex];

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
                    Prompt {currentIndex + 1} of {data.length}
                </span>

                <button
                    onClick={handleNext}
                    disabled={currentIndex === data.length - 1}
                    className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Prompt Display */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                    <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
                        <h2 className="text-2xl font-bold mb-4 text-slate-800">{prompt.title}</h2>
                        <p className="text-xl leading-relaxed text-slate-700 mb-6">
                            {prompt.text}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {prompt.chips.map((chip, idx) => (
                                <span key={idx} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-semibold border border-orange-200">
                                    {chip}
                                </span>
                            ))}
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <h3 className="font-bold text-slate-700 mb-2">Follow-up Questions:</h3>
                            <ul className="list-disc list-inside space-y-1 text-slate-600">
                                {prompt.followUps.map((q, idx) => (
                                    <li key={idx}>{q}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setActiveRole('fluency')}
                            className={clsx(
                                "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all",
                                activeRole === 'fluency'
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                                    : "bg-white text-slate-600 border-2 border-slate-200 hover:border-blue-300"
                            )}
                        >
                            <Mic size={20} />
                            Student A: Fluency
                        </button>
                        <button
                            onClick={() => setActiveRole('articulation')}
                            className={clsx(
                                "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all",
                                activeRole === 'articulation'
                                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105"
                                    : "bg-white text-slate-600 border-2 border-slate-200 hover:border-emerald-300"
                            )}
                        >
                            <Ear size={20} />
                            Student B: Articulation
                        </button>
                    </div>

                    {/* Role Specific Content */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 min-h-[300px]">
                        {activeRole === 'fluency' ? (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex items-center gap-2 text-blue-600 mb-2">
                                    <Mic />
                                    <h3 className="text-xl font-bold">Fluency Focus</h3>
                                </div>
                                <p className="text-slate-600">Use a preferred fluency strategy while you talk (e.g., easy onset, pausing, light contacts).</p>

                                <div>
                                    <label className="block font-bold text-slate-700 mb-2">Strategies I used:</label>
                                    <textarea
                                        className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors min-h-[100px]"
                                        placeholder="Which strategies did you use?"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-slate-700 mb-2">Did it help?</label>
                                    <textarea
                                        className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors min-h-[100px]"
                                        placeholder="When did you need a strategy? Did it help or feel bumpy?"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                                    <Ear />
                                    <h3 className="text-xl font-bold">Articulation Self-Correction</h3>
                                </div>
                                <p className="text-slate-600">Listen for your sounds and repair when needed.</p>

                                <div>
                                    <label className="block font-bold text-slate-700 mb-2">Words/sounds that felt hard:</label>
                                    <textarea
                                        className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors min-h-[100px]"
                                        placeholder="List tricky words or sounds that came up."
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-slate-700 mb-2">Did you fix them?</label>
                                    <textarea
                                        className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors min-h-[100px]"
                                        placeholder="Were you able to go back and fix them? How did you do it?"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                </motion.div>
            </AnimatePresence>
        </div>
    );
}
