/**
 * Activity Registry
 * Maps activity IDs to their configuration, data, and engine type.
 */

import { wordDefinitions, contextClues } from './language-data.js';

export const activityRegistry = {
    'definitions': {
        title: '🎯 Word Definitions',
        subtitle: 'Match the words to their meanings',
        type: 'quiz',
        data: wordDefinitions,
        engineConfig: {
            questionTemplate: (item) => `What is the definition of <span class="target-word">${item.word}</span>?`,
            hintTemplate: (item) => item.categoryHint,
            getOptions: (item, engine) => engine.shuffleArray(item.categoryChoices),
            getCorrectAnswer: (item) => item.category
        }
    },
    'context-clues': {
        title: '🔍 Context Clues',
        subtitle: 'Use clues to find the meaning',
        type: 'quiz',
        data: contextClues,
        engineConfig: {
            questionTemplate: (item) => `
                <div class="question-text">${item.text}</div>
                <div class="question-text" style="font-size: 1em; color: #666;">
                    What does <strong>${item.word}</strong> mean?
                </div>
            `,
            hintTemplate: (item) => item.hint,
            getOptions: (item, engine) => engine.shuffleArray(item.choices),
            // Assuming first choice is correct as per previous analysis
            getCorrectAnswer: (item) => item.choices[0]
        }
    }
};
