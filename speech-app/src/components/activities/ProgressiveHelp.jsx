import { useState, useEffect } from 'react';
import { Lightbulb, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

export default function ProgressiveHelp({
    item,
    onCorrect,
    onIncorrect,
    helpLevel,
    setHelpLevel,
    getOptions,
    getCorrectAnswer,
    hintTemplate
}) {
    const [inputValue, setInputValue] = useState('');
    const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }
    const [selectedOption, setSelectedOption] = useState(null);

    // Reset local state when item changes
    useEffect(() => {
        setInputValue('');
        setFeedback(null);
        setSelectedOption(null);
    }, [item]);

    const handleInputCheck = () => {
        if (inputValue.trim().length > 0) {
            setFeedback({
                type: 'success',
                message: "Great effort! Let's see how close you were."
            });
            // Auto-advance to choices after a brief delay or immediately?
            // User flow: Input -> "I need help" -> Hint -> "I need more help" -> Choices
            // If they type something, maybe we just show the choices immediately?
            // Let's stick to the requested flow: Input doesn't auto-advance, buttons do.
            // But if they check input, maybe we give them a "gold star" and show choices?
            setTimeout(() => setHelpLevel(2), 1000);
        } else {
            setFeedback({
                type: 'error',
                message: "Please type something first."
            });
        }
    };

    const handleOptionClick = (option) => {
        if (selectedOption) return; // Prevent multiple clicks
        setSelectedOption(option);

        const correct = getCorrectAnswer(item);
        if (option === correct) {
            setFeedback({ type: 'success', message: "🎉 Correct! Great job." });
            onCorrect();
        } else {
            setFeedback({ type: 'error', message: "Not quite. Try again or check the correct answer." });
            onIncorrect();
        }
    };

    const options = getOptions(item);
    const correct = getCorrectAnswer(item);
    const hint = hintTemplate(item);

    return (
        <div className="space-y-6">
            {/* Level 0: Input */}
            <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">
                    Type your definition:
                </label>
                <div className="flex gap-2">
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your own definition here..."
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        rows={3}
                    />
                </div>
                {/* Optional check button if we want to validate input */}
                {/* <button onClick={handleInputCheck} className="...">Check</button> */}
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap gap-3">
                {helpLevel === 0 && (
                    <button
                        onClick={() => setHelpLevel(1)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-amber-400 text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
                    >
                        <Lightbulb size={18} />
                        I need help
                    </button>
                )}

                {helpLevel === 1 && (
                    <button
                        onClick={() => setHelpLevel(2)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-blue-500 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                        <BookOpen size={18} />
                        I need more help
                    </button>
                )}
            </div>

            {/* Level 1: Hint */}
            {helpLevel >= 1 && hint && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex gap-3">
                        <Lightbulb className="text-amber-500 shrink-0" />
                        <div>
                            <h4 className="font-bold text-amber-800">Hint</h4>
                            <p className="text-amber-700">{hint}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Level 2: Choices */}
            {helpLevel >= 2 && (
                <div className="grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
                    {options.map((option, idx) => {
                        const isSelected = selectedOption === option;
                        const isCorrect = option === correct;

                        let stateClass = "border-slate-200 hover:border-blue-400 hover:bg-slate-50";
                        if (selectedOption) {
                            if (isCorrect) stateClass = "border-green-500 bg-green-50 text-green-700";
                            else if (isSelected) stateClass = "border-red-500 bg-red-50 text-red-700";
                            else if (option === correct && selectedOption !== correct) stateClass = "border-green-500 bg-green-50 text-green-700 ring-2 ring-green-200"; // Show correct answer
                            else stateClass = "border-slate-100 opacity-50";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleOptionClick(option)}
                                disabled={!!selectedOption}
                                className={clsx(
                                    "p-4 text-left border-2 rounded-xl transition-all duration-200 font-medium relative",
                                    stateClass
                                )}
                            >
                                {option}
                                {selectedOption && isCorrect && (
                                    <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600" size={20} />
                                )}
                                {isSelected && !isCorrect && (
                                    <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-red-600" size={20} />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Feedback Area */}
            {feedback && (
                <div className={clsx(
                    "p-4 rounded-lg text-center font-bold animate-in zoom-in duration-300",
                    feedback.type === 'success' ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                )}>
                    {feedback.message}
                </div>
            )}
        </div>
    );
}
