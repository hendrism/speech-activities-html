import { wordDefinitions } from './definitions';
import { contextClues } from './contextClues';
import { articulationWordData, sentenceTemplates } from './articulation';
import QuizEngine from '../components/activities/QuizEngine';
import ArticulationActivity from '../components/activities/ArticulationActivity';

export const activityRegistry = {
    'definitions': {
        title: 'Word Definitions',
        subtitle: 'Match the words to their meanings',
        component: QuizEngine,
        data: wordDefinitions,
        config: {
            questionTemplate: (item) => (
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                        What is the definition of <span className="text-blue-600">{item.word}</span>?
                    </h3>
                </div>
            ),
            hintTemplate: (item) => item.categoryHint,
            getOptions: (item) => item.categoryChoices,
            getCorrectAnswer: (item) => item.category
        }
    },
    'context-clues': {
        title: 'Context Clues',
        subtitle: 'Use clues to find the meaning',
        component: QuizEngine,
        data: contextClues,
        config: {
            questionTemplate: (item) => (
                <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-blue-500">
                    <p
                        className="text-xl leading-relaxed text-slate-800"
                        dangerouslySetInnerHTML={{ __html: item.text }}
                    />
                    <p className="mt-4 text-slate-500 font-medium">
                        What does <strong>{item.word}</strong> mean?
                    </p>
                </div>
            ),
            hintTemplate: (item) => item.hint,
            getOptions: (item) => item.choices,
            // Assuming first choice is correct based on legacy data structure
            getCorrectAnswer: (item) => item.choices[0]
        }
    },
    'articulation': {
        title: 'Articulation Practice',
        subtitle: 'Build sentences with target sounds',
        component: ArticulationActivity,
        data: { articulationWordData, sentenceTemplates },
        config: {}
    }
};
