import { wordDefinitions } from './definitions';

import { articulationWordData, generateArticulationData } from './articulation';
import { fallStories } from './fallStories';
import { socialScenarios } from './socialScenarios';
import { compareContrastData } from './compareContrast';
import { contextCluesEasy, contextCluesMedium, contextCluesHard } from './contextClues';
import { contextCluesSet3Easy, contextCluesSet3Medium, contextCluesSet3Hard } from './contextCluesSet3';
import { contextCluesSet2Easy, contextCluesSet2Medium, contextCluesSet2Hard } from './contextCluesSet2';


import { analogiesData } from './analogies';
import { synonymsData } from './synonyms';
import { antonymsData } from './antonyms';
import { multipleMeaningsData } from './multipleMeanings';
import { fallNounsData } from './fallNouns';
import { fallNounsCategory, fallNounsFunction } from './fallNounsData';
import { readingComprehensionData } from './readingComprehension';
import { sentenceBuilderMiddleData } from './sentenceBuilderMiddle';
import { mainIdeaDetailsData } from './mainIdeaDetails';
import { sentenceBuilderElementaryData } from './sentenceBuilderElementary';
import { multipleMeaningsElementaryData } from './multipleMeaningsElementary';
import { socialStoriesElementaryData } from './socialStoriesElementary';
import { fallReadingStoriesData } from './fallReadingStories';
import { finalLBlendStoriesData } from './finalLBlendStories';
import { hsStoryRetellingData } from './hsStoryRetelling';




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
        category: 'language',
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
        category: 'articulation',
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
        category: 'reading',
        title: 'Fall Reading Stories',
        subtitle: 'Read short stories and answer questions',
        component: StoryEngine,
        data: fallStories,
        config: {}
    },
    'social-scenarios': {
        category: 'social',
        title: 'Social Problem Solving',
        subtitle: 'Explore solutions to social challenges',
        component: ScenarioEngine,
        data: socialScenarios,
        config: {}
    },
    'compare-contrast': {
        category: 'language',
        component: VisualizerEngine,
        data: compareContrastData,
        title: "Compare & Contrast",
        subtitle: "Organize items into categories",
        // VisualizerEngine handles its own rendering logic
        config: {}
    },
    'context-clues-easy': {
        category: 'language',
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
        category: 'language',
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
        category: 'language',
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
    'context-clues-3-easy': {
        category: 'language',
        component: QuizEngine,
        data: contextCluesSet3Easy,
        title: "Context Clues Set 3 (Easy)",
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
    'context-clues-3-medium': {
        category: 'language',
        component: QuizEngine,
        data: contextCluesSet3Medium,
        title: "Context Clues Set 3 (Medium)",
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
    'context-clues-3-hard': {
        category: 'language',
        component: QuizEngine,
        data: contextCluesSet3Hard,
        title: "Context Clues Set 3 (Hard)",
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
    'context-clues-2-easy': {
        category: 'language',
        component: QuizEngine,
        data: contextCluesSet2Easy,
        title: "Context Clues Set 2 (Easy)",
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
    'context-clues-2-medium': {
        category: 'language',
        component: QuizEngine,
        data: contextCluesSet2Medium,
        title: "Context Clues Set 2 (Medium)",
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
    'context-clues-2-hard': {
        category: 'language',
        component: QuizEngine,
        data: contextCluesSet2Hard,
        title: "Context Clues Set 2 (Hard)",
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
        category: 'language',
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
        category: 'language',
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
        category: 'language',
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
        category: 'language',
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
            hintTemplate: () => "Read the sentence carefully. How is the word being used?",
            getOptions: (item) => item.definitions,
            getCorrectAnswer: (item) => item.correctDefinition
        }
    },
    'fall-nouns': {
        category: 'language',
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
    'fall-nouns-quiz': {
        category: 'language',
        component: QuizEngine,
        data: [...fallNounsCategory, ...fallNounsFunction],
        title: "Fall Nouns (Quiz Mode)",
        subtitle: "Identify categories and functions",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4" dangerouslySetInnerHTML={{ __html: item.text }} />
                </div>
            ),
            hintTemplate: (item) => item.hint,
            getOptions: (item) => item.choices,
            getCorrectAnswer: (item) => item.correctAnswer
        }
    },

    'thanksgiving-clues': {
        category: 'language',
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
        category: 'reading',
        component: ScenarioEngine,
        data: inferenceCluesData,
        title: "Inference Practice (Grade 9)",
        subtitle: "Infer feelings, problems, and solutions",
        config: {
            // ScenarioEngine handles its own rendering based on data structure
        }
    },
    'past-tense': {
        category: 'grammar',
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
        category: 'language',
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
        category: 'language',
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
        category: 'grammar',
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
    },
    'reading-comprehension': {
        category: 'reading',
        component: StoryEngine,
        data: readingComprehensionData,
        title: "Reading Comprehension",
        subtitle: "Main Ideas & Vocabulary",
        config: {}
    },
    'sentence-builder-middle': {
        category: 'language',
        component: QuizEngine,
        data: sentenceBuilderMiddleData,
        title: "Sentence Builder (Middle School)",
        subtitle: "Learn words and build sentences",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4">
                        What is the definition of <strong>{item.word}</strong>?
                    </div>
                    <div className="text-sm text-slate-500 italic mb-4">Hint: {item.hint}</div>
                </div>
            ),
            hintTemplate: (item) => item.example,
            getOptions: (item) => item.choices,
            getCorrectAnswer: (item) => item.definition
        }
    },
    'main-idea-details': {
        category: 'reading',
        component: QuizEngine,
        data: mainIdeaDetailsData,
        title: "Main Idea & Details Lab",
        subtitle: "Identify the main idea",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-lg text-slate-700 mb-4 p-4 bg-slate-50 rounded-lg border-l-4 border-blue-500">
                        {item.passage}
                    </div>
                    <div className="text-xl font-medium text-slate-800">
                        What is the <strong>Main Idea</strong> of this passage?
                    </div>
                </div>
            ),
            hintTemplate: () => "Look for the sentence that summarizes the entire passage, not just one detail.",
            getOptions: (item) => item.options,
            getCorrectAnswer: (item) => item.mainIdea
        }
    },
    'sentence-builder-elementary': {
        category: 'language',
        component: QuizEngine,
        data: sentenceBuilderElementaryData,
        title: "Sentence Builder (Elementary)",
        subtitle: "Learn words and their meanings",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4">
                        Which word means: <strong>"{item.definition}"</strong>?
                    </div>
                    <div className="text-sm text-slate-500 italic mb-4">Hint: {item.hint}</div>
                </div>
            ),
            hintTemplate: (item) => item.example,
            getOptions: (item) => item.choices,
            getCorrectAnswer: (item) => item.word
        }
    },
    'multiple-meanings-elementary': {
        category: 'language',
        component: QuizEngine,
        data: multipleMeaningsElementaryData,
        title: "Multiple Meanings (Elementary)",
        subtitle: "Match the definition to the sentence",
        config: {
            questionTemplate: (item) => (
                <div>
                    <div className="text-xl font-medium text-slate-700 mb-4" dangerouslySetInnerHTML={{ __html: item.sentence }} />
                    <div className="text-lg text-slate-600">
                        Which definition matches the bold word?
                    </div>
                </div>
            ),
            hintTemplate: () => "Read the sentence carefully to understand how the word is used.",
            getOptions: (item) => item.options,
            getCorrectAnswer: (item) => item.correct
        }
    },
    'social-stories-elementary': {
        category: 'reading',
        component: StoryEngine,
        data: socialStoriesElementaryData,
        title: "Social Stories (Elementary)",
        subtitle: "Read and reflect on social situations",
        config: {}
    },
    'fall-reading-stories': {
        category: 'reading',
        component: StoryEngine,
        data: fallReadingStoriesData,
        title: "Fall Reading Stories",
        subtitle: "Seasonal reading comprehension",
        config: {}
    },
    'final-l-blend-stories': {
        category: 'reading',
        component: StoryEngine,
        data: finalLBlendStoriesData,
        title: "Final /l/ Blend Stories",
        subtitle: "Phonics practice with stories",
        config: {}
    },
    'hs-story-retelling': {
        category: 'reading',
        component: StoryEngine,
        data: hsStoryRetellingData,
        title: "HS Story Retelling",
        subtitle: "High-interest stories for retelling",
        config: {}
    },






};

// Auto-Discovery: Load all activity files from the 'activities' directory
const activityFiles = import.meta.glob('./activities/*.js', { eager: true });

Object.values(activityFiles).forEach(module => {
    const activity = module.default;
    if (activity && activity.id) {
        activityRegistry[activity.id] = activity;
    }
});


