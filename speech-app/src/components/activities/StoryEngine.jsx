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
