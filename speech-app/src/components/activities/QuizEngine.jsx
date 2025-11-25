import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';
import ProgressiveHelp from './ProgressiveHelp';
import clsx from 'clsx';

export default function QuizEngine({
    data,
    title,
    subtitle,
    questionTemplate,
    hintTemplate,
    getOptions,
    getCorrectAnswer
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [helpLevel, setHelpLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [shuffledData, setShuffledData] = useState([]);
    const [currentOptions, setCurrentOptions] = useState([]);

    // Initialize and shuffle data
    useEffect(() => {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setShuffledData(shuffled);
        setCurrentIndex(0);
        setScore(0);
        setIsComplete(false);
        setHelpLevel(0);
    }, [data]);

    const currentItem = shuffledData[currentIndex];

    // Shuffle options when current item changes
    useEffect(() => {
        if (currentItem && getOptions) {
            const rawOptions = getOptions(currentItem);
            // Create a copy and shuffle
            const shuffled = [...rawOptions].sort(() => Math.random() - 0.5);
            setCurrentOptions(shuffled);
        }
    }, [currentItem, getOptions]);

    const handleNext = () => {
        if (currentIndex < shuffledData.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setHelpLevel(0);
        } else {
            setIsComplete(true);
        }
    };

    const handleJumpTo = (index) => {
        setCurrentIndex(index);
        setHelpLevel(0);
    };

    const handleCorrect = () => {
        setScore(prev => prev + 1);
    };

    const handleIncorrect = () => {
        // No score penalty?
    };

    if (!currentItem) return <div className="p-8 text-center">Loading...</div>;

    if (isComplete) {
        return (
            <div className="text-center py-12">
                <div className="inline-block p-4 rounded-full bg-green-100 text-green-600 mb-6">
                    <RefreshCw size={48} />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Activity Complete!</h2>
                <p className="text-xl text-slate-600 mb-8">
                    You got {score} out of {shuffledData.length} correct.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                    Play Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Progress & Navigation */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-slate-500 mb-2">
                    <span>Word {currentIndex + 1} of {shuffledData.length}</span>
                    <span>Score: {score}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${((currentIndex + 1) / shuffledData.length) * 100}%` }}
                    />
                </div>

                {/* Navigation Bar */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {shuffledData.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleJumpTo(idx)}
                            className={clsx(
                                "w-8 h-8 rounded-full text-xs font-bold transition-all",
                                idx === currentIndex
                                    ? "bg-blue-600 text-white scale-110 shadow-md"
                                    : idx < currentIndex
                                        ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                        : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                            )}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                {/* Image Area */}
                {currentItem.imageUrl && (
                    <div className="w-full h-64 bg-slate-50 flex items-center justify-center border-b border-slate-100">
                        <img
                            src={currentItem.imageUrl}
                            alt="Question"
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                )}

                <div className="p-8">
                    {/* Question Text */}
                    <div className="mb-8">
                        {/* We render the template result. Since templates return HTML strings in the old system, 
                 we might need to adapt them or use dangerouslySetInnerHTML. 
                 For React, it's better if templates return JSX or we parse them.
                 For now, let's assume we pass a render function that returns JSX. */}
                        {questionTemplate(currentItem)}
                    </div>

                    {/* Interaction Area */}
                    <ProgressiveHelp
                        item={currentItem}
                        onCorrect={handleCorrect}
                        onIncorrect={handleIncorrect}
                        helpLevel={helpLevel}
                        setHelpLevel={setHelpLevel}
                        getOptions={() => currentOptions}
                        getCorrectAnswer={getCorrectAnswer}
                        hintTemplate={hintTemplate}
                    />
                </div>

                {/* Footer Controls */}
                <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center">
                    <button
                        onClick={() => handleJumpTo(Math.max(0, currentIndex - 1))}
                        disabled={currentIndex === 0}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 disabled:opacity-50 transition-colors font-medium px-4 py-2"
                    >
                        <ArrowLeft size={20} /> Previous
                    </button>

                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-sm hover:shadow-md"
                    >
                        Next <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
