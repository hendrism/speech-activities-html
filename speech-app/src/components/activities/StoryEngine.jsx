import { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressiveHelp from './ProgressiveHelp';
import clsx from 'clsx';

// Wrapper to manage state for each question independently
function StoryQuestion({ question, index }) {
    const [helpLevel, setHelpLevel] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);

    // Memoize options so they don't reshuffle on every render
    const [options] = useState(() =>
        [question.correct, ...question.wrong].sort(() => Math.random() - 0.5)
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h4 className="text-lg font-bold text-slate-800 mb-4 flex gap-3">
                <span className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-colors",
                    isCorrect ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                )}>
                    {isCorrect ? <CheckCircle size={18} /> : index + 1}
                </span>
                {question.q}
            </h4>

            <ProgressiveHelp
                item={question}
                helpLevel={helpLevel}
                setHelpLevel={setHelpLevel}
                getOptions={() => options}
                getCorrectAnswer={(item) => item.correct}
                hintTemplate={() => "Look back at the story text for the answer."}
                onCorrect={() => setIsCorrect(true)}
                onIncorrect={() => { }}
            />
        </div>
    );
}

export default function StoryEngine({ data }) {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const story = data[currentStoryIndex];

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
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left Column: Story Text */}
            <div className="space-y-6">
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
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">{story.title}</h2>
                        <div className="space-y-4 text-lg leading-relaxed text-slate-700 font-medium">
                            {story.text.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Right Column: Questions */}
            <div className="space-y-8">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2">Comprehension Check</h3>
                    <p className="text-blue-600 text-sm">Answer the questions based on the story.</p>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStoryIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {story.questions.map((q, idx) => (
                            <StoryQuestion
                                key={`${currentStoryIndex}-${idx}`}
                                question={q}
                                index={idx}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    );
}
