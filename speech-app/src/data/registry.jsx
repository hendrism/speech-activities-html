import { wordDefinitions } from './definitions';

import { articulationWordData, generateArticulationData } from './articulation';
import { fallStories } from './fallStories';
import { socialScenarios } from './socialScenarios';
import { compareContrastData } from './compareContrast';
import { contextCluesEasy, contextCluesMedium, contextCluesHard } from './contextClues';
import { analogiesData } from './analogies';
import { synonymsData } from './synonyms';
import { antonymsData } from './antonyms';
import { multipleMeaningsData } from './multipleMeanings';
import { fallNounsData } from './fallNouns';
import { thanksgivingCluesData } from './thanksgivingClues';
import { inferenceCluesData } from './inferenceClues';
import { pastTenseData } from './pastTense';
import { detectiveCluesData } from './detectiveClues';
import { multipleMeaningsAdvancedData } from './multipleMeaningsAdvanced';
import { pluralNounsData } from './pluralNouns';
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
    },
    'analogies': {
        component: QuizEngine,
        data: analogiesData,
        title: "Analogies",
        subtitle: "Find the relationship between words",
        config: {
            questionTemplate: (item) => (
                <div className="text-center">
                    <div className="flex items-center justify-center gap-4 text-2xl font-bold text-slate-700 mb-8">
                        <span>{item.word1}</span>
                        <span className="text-slate-400">is to</span>
                        <span>{item.word2}</span>
                        <span className="text-slate-400">as</span>
                        <span>{item.word3}</span>
                        <span className="text-slate-400">is to...</span>
                    </div>
                    <div className="text-lg text-slate-600 mb-4">
                        Relationship: <span className="font-semibold text-blue-600">{item.relationshipType}</span>
                    </div>
                </div>
            ),
            hintTemplate: (item) => item.hint,
            getOptions: (item) => item.choices,
            getCorrectAnswer: (item) => item.answer
        }
    },
    'synonyms': {
        component: QuizEngine,
        data: synonymsData,
        title: "Synonyms (Thanksgiving)",
        subtitle: "Find words with the same meaning",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4" dangerouslySetInnerHTML={{ __html: item.sentence }} />
                    <div className="text-lg text-slate-600">Which word means the SAME as <strong>{item.word}</strong>?</div>
                </div>
            ),
            hintTemplate: (item) => item.hint,
            getOptions: (item) => [item.correct, ...item.distractors],
            getCorrectAnswer: (item) => item.correct
        }
    },
    'antonyms': {
        component: QuizEngine,
        data: antonymsData,
        title: "Antonyms (Fall)",
        subtitle: "Find words with the opposite meaning",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4">{item.sentence}</div>
                    <div className="text-lg text-slate-600">What is the OPPOSITE of <strong>{item.word}</strong>?</div>
                </div>
            ),
            hintTemplate: (item) => item.clue,
            getOptions: (item) => item.choices,
            getCorrectAnswer: (item) => item.answer
        }
    },
    'multiple-meanings': {
        component: QuizEngine,
        data: multipleMeaningsData,
        title: "Multiple Meanings",
        subtitle: "Match the definition to the context",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4" dangerouslySetInnerHTML={{ __html: item.text }} />
                    <div className="text-lg text-slate-600">Which definition matches the word <strong>{item.word}</strong> in this sentence?</div>
                </div>
            ),
            hintTemplate: (item) => "Read the sentence carefully. How is the word being used?",
            getOptions: (item) => item.definitions,
            getCorrectAnswer: (item) => item.correctDefinition
        }
    },
    'fall-nouns': {
        component: QuizEngine,
        data: fallNounsData,
        title: "Fall Nouns",
        subtitle: "Category & Function Practice",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4" dangerouslySetInnerHTML={{ __html: item.question }} />
                </div>
            ),
            hintTemplate: (item) => `Think about what a ${item.noun} is or what you do with it.`,
            getOptions: (item) => item.choices,
            getCorrectAnswer: (item) => item.answer
        }
    },
    'thanksgiving-clues': {
        component: QuizEngine,
        data: thanksgivingCluesData,
        title: "Context Clues (Thanksgiving)",
        subtitle: "Use clues to find the meaning",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4" dangerouslySetInnerHTML={{ __html: item.sentence }} />
                    <div className="text-lg text-slate-600">What does <strong>{item.word}</strong> mean?</div>
                </div>
            ),
            hintTemplate: (item) => item.hint,
            getOptions: (item) => item.choices,
            getCorrectAnswer: (item) => item.choices[0]
        }
    },
    'inference-clues': {
        component: ScenarioEngine,
        data: inferenceCluesData,
        title: "Inference Practice (Grade 9)",
        subtitle: "Infer feelings, problems, and solutions",
        config: {
            // ScenarioEngine handles its own rendering based on data structure
        }
    },
    'past-tense': {
        component: QuizEngine,
        data: pastTenseData.flatMap(verb => verb.sentences.map(s => ({ ...s, verb: verb.verb, answer: verb.answer }))),
        title: "Past Tense Verbs",
        subtitle: "Practice regular and irregular verbs",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4">
                        {item.text.split('_____').map((part, i, arr) => (
                            <span key={i}>
                                {part}
                                {i < arr.length - 1 && <span className="inline-block w-24 border-b-2 border-slate-400 mx-1"></span>}
                            </span>
                        ))}
                    </div>
                    <div className="text-lg text-slate-600">Choose the correct past tense form of <strong>{item.verb}</strong>.</div>
                </div>
            ),
            hintTemplate: (item) => `The correct past tense of ${item.verb} is ${item.answer}.`,
            getOptions: (item) => item.choices,
            getCorrectAnswer: (item) => item.answer
        }
    },
    'detective-clues': {
        component: QuizEngine,
        data: detectiveCluesData,
        title: "Context Clues Detective",
        subtitle: "Investigate word meanings",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4 bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
                        "{item.passage}"
                    </div>
                    <div className="text-lg text-slate-600">What does <strong>{item.word}</strong> mean?</div>
                </div>
            ),
            hintTemplate: (item) => (
                <div>
                    <p className="mb-2"><strong>Clue 1:</strong> {item.clue1}</p>
                    <p><strong>Clue 2:</strong> {item.clue2}</p>
                </div>
            ),
            getOptions: (item) => item.choices,
            getCorrectAnswer: (item) => item.answer
        }
    },
    'multiple-meanings-advanced': {
        component: QuizEngine,
        data: multipleMeaningsAdvancedData,
        title: "Multiple Meanings (Advanced)",
        subtitle: "Identify definitions for words",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4">
                        What is a definition for the word <strong>{item.word}</strong>?
                    </div>
                    <div className="text-sm text-slate-500 italic">Hint: {item.clue}</div>
                </div>
            ),
            hintTemplate: (item) => item.clue,
            getOptions: (item) => item.choices,
            getCorrectAnswer: (item) => item.definition
        }
    },
    'plural-nouns': {
        component: QuizEngine,
        data: pluralNounsData,
        title: "Plural Nouns Practice",
        subtitle: "Regular and Irregular Plurals",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4" dangerouslySetInnerHTML={{ __html: item.sentence }} />
                    <div className="text-lg text-slate-600">
                        {item.pluralSentence.replace('_____', '_______')}
                    </div>
                </div>
            ),
            hintTemplate: (item) => `The plural of ${item.singular} is ${item.plural}.`,
            getOptions: (item) => [item.plural, ...item.foils],
            getCorrectAnswer: (item) => item.plural
        }
    }

};

