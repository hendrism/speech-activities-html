import { wordDefinitions } from './definitions';

import { articulationWordData, generateArticulationData } from './articulation';
import { fallStories } from './fallStories';
import { socialScenarios } from './socialScenarios';
import { compareContrastData } from './compareContrast';
import { contextCluesEasy, contextCluesMedium, contextCluesHard } from './contextClues';
import QuizEngine from '../components/activities/QuizEngine';
import BuilderEngine from '../components/activities/BuilderEngine';
import StoryEngine from '../components/activities/StoryEngine';
import ScenarioEngine from '../components/activities/ScenarioEngine';
import VisualizerEngine from '../components/activities/VisualizerEngine';
import clsx from 'clsx';

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

    'articulation': {
        title: 'Articulation Practice',
        subtitle: 'Build sentences with target sounds',
        component: BuilderEngine,
        data: {
            generateItems: generateArticulationData
        },
        config: {
            title: "Sentence Builder",
            instructions: "Drag the correct word to complete each sentence.",
            setupConfig: {
                render: ({ state, setState, onComplete }) => (
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-3">1. Select Sound Group</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.entries(articulationWordData).map(([key, value]) => (
                                    <button
                                        key={key}
                                        onClick={() => setState(prev => ({ ...prev, category: key, blends: [] }))}
                                        className={clsx(
                                            "p-4 rounded-xl border-2 text-left transition-all",
                                            state.category === key
                                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                                : "border-slate-200 hover:border-blue-300"
                                        )}
                                    >
                                        <span className="font-bold">{value.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {state.category && (
                            <div className="animate-in fade-in slide-in-from-top-4">
                                <h3 className="font-semibold text-slate-700 mb-3">2. Select Specific Blends</h3>
                                <div className="flex flex-wrap gap-2">
                                    {Object.keys(articulationWordData[state.category].blends).map(blend => (
                                        <button
                                            key={blend}
                                            onClick={() => {
                                                const currentBlends = state.blends || [];
                                                const newBlends = currentBlends.includes(blend)
                                                    ? currentBlends.filter(b => b !== blend)
                                                    : [...currentBlends, blend];
                                                setState(prev => ({ ...prev, blends: newBlends }));
                                            }}
                                            className={clsx(
                                                "px-4 py-2 rounded-lg font-medium border-2 transition-all",
                                                (state.blends || []).includes(blend)
                                                    ? "border-green-500 bg-green-50 text-green-700"
                                                    : "border-slate-200 hover:border-green-300"
                                            )}
                                        >
                                            {blend}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={onComplete}
                            disabled={!state.category || !state.blends || state.blends.length === 0}
                            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-200"
                        >
                            Start Activity
                        </button>
                    </div>
                )
            }
        }
    },
    'fall-stories': {
        title: 'Fall Reading Stories',
        subtitle: 'Read short stories and answer questions',
        component: StoryEngine,
        data: fallStories,
        config: {}
    },
    'social-scenarios': {
        title: 'Social Problem Solving',
        subtitle: 'Explore solutions to social challenges',
        component: ScenarioEngine,
        data: socialScenarios,
        config: {}
    },
    'compare-contrast': {
        component: VisualizerEngine,
        data: compareContrastData,
        title: "Compare & Contrast",
        subtitle: "Organize items into categories",
        // VisualizerEngine handles its own rendering logic
        config: {}
    },
    'context-clues-easy': {
        component: QuizEngine,
        data: contextCluesEasy,
        title: "Context Clues (Easy)",
        subtitle: "Use clues to find the meaning",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4" dangerouslySetInnerHTML={{ __html: item.text }} />
                    <div className="text-lg text-slate-600">What does <strong>{item.word}</strong> mean?</div>
                </div>
            ),
            hintTemplate: (item) => item.hint,
            getOptions: (item) => item.choices,
            getCorrectAnswer: (item) => item.choices[0]
        }
    },
    'context-clues-medium': {
        component: QuizEngine,
        data: contextCluesMedium,
        title: "Context Clues (Medium)",
        subtitle: "Use clues to find the meaning",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4" dangerouslySetInnerHTML={{ __html: item.text }} />
                    <div className="text-lg text-slate-600">What does <strong>{item.word}</strong> mean?</div>
                </div>
            ),
            hintTemplate: (item) => item.hint,
            getOptions: (item) => item.choices,
            getCorrectAnswer: (item) => item.choices[0]
        }
    },
    'context-clues-hard': {
        component: QuizEngine,
        data: contextCluesHard,
        title: "Context Clues (Hard)",
        subtitle: "Use clues to find the meaning",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4" dangerouslySetInnerHTML={{ __html: item.text }} />
                    <div className="text-lg text-slate-600">What does <strong>{item.word}</strong> mean?</div>
                </div>
            ),
            hintTemplate: (item) => item.hint,
            getOptions: (item) => item.choices,
            getCorrectAnswer: (item) => item.choices[0]
        }
    }
};

