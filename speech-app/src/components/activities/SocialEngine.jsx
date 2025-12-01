import { useState } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

export default function SocialEngine({ data }) {
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
                    Scenario {currentIndex + 1} of {data.length}
                </span>

                <button
                    onClick={handleNext}
                    disabled={currentIndex === data.length - 1}
                    className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Scenario Display */}
            <AnimatePresence mode="wait">
                <Motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                    <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
                        <h2 className="text-2xl font-bold mb-4 text-slate-800">{scenario.title}</h2>
                        <p className="text-xl leading-relaxed text-slate-700">
                            {scenario.text}
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Problem Identification */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center gap-2 mb-4 text-rose-600">
                                <AlertCircle />
                                <h3 className="text-lg font-bold">What is the problem?</h3>
                            </div>
                            <textarea
                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors min-h-[120px]"
                                placeholder="Describe the social problem or conflict..."
                            />
                        </div>

                        {/* Clue Identification */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center gap-2 mb-4 text-blue-600">
                                <Lightbulb />
                                <h3 className="text-lg font-bold">What are the clues?</h3>
                            </div>
                            <div className="mb-4 flex flex-wrap gap-2">
                                {scenario.clues.map((clue, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
                                        {clue}
                                    </span>
                                ))}
                            </div>
                            <textarea
                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors min-h-[80px]"
                                placeholder="What details tell you there is a problem?"
                            />
                        </div>
                    </div>

                    {/* Solution Proposal */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 mb-4 text-emerald-600">
                            <CheckCircle />
                            <h3 className="text-lg font-bold">How can we fix it?</h3>
                        </div>
                        <textarea
                            className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors min-h-[100px]"
                            placeholder="Propose a solution to improve the situation..."
                        />
                    </div>

                </Motion.div>
            </AnimatePresence>
        </div>
    );
}
