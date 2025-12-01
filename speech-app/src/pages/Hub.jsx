import Layout from '../components/layout/Layout';
import ActivityCard from '../components/common/ActivityCard';
import { Layout as LayoutIcon, MessageSquare, BookOpen, Brain, Search, MessageCircle, Split, Users } from 'lucide-react';

export default function Hub() {
    return (
        <Layout>
            <div className="text-center mb-12 py-8">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    Speech Therapy Activities
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Interactive tools to practice articulation, vocabulary, and language skills.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ActivityCard
                    id="definitions"
                    title="Word Definitions"
                    description="Match words to their meanings to build vocabulary."
                    icon={BookOpen}
                />

                <ActivityCard
                    id="context-clues"
                    title="Context Clues"
                    description="Use clues in sentences to figure out word meanings."
                    icon={Search}
                />

                <ActivityCard
                    id="articulation"
                    title="Articulation Practice"
                    description="Build sentences using words with specific target sounds."
                    icon={BookOpen}
                />

                <ActivityCard
                    id="fall-stories"
                    title="Fall Stories"
                    description="Read short stories about Fall and answer comprehension questions."
                    icon={BookOpen}
                />

                <ActivityCard
                    id="social-scenarios"
                    title="Social Problem Solving"
                    description="Practice solving social problems with guided hints."
                    icon={BookOpen}
                />

                <ActivityCard
                    title="Compare & Contrast"
                    icon={LayoutIcon}
                    color="bg-purple-500"
                    id="compare-contrast"
                />
                <ActivityCard
                    title="Context Clues (Easy)"
                    icon={Search}
                    color="bg-teal-500"
                    id="context-clues-easy"
                />
                <ActivityCard
                    title="Context Clues (Medium)"
                    icon={Search}
                    color="bg-teal-600"
                    id="context-clues-medium"
                />
                <ActivityCard
                    title="Context Clues (Hard)"
                    icon={Search}
                    color="bg-teal-700"
                    id="context-clues-hard"
                />
                <ActivityCard
                    title="Context Clues Set 3 (Easy)"
                    icon={Search}
                    color="bg-teal-500"
                    id="context-clues-3-easy"
                />
                <ActivityCard
                    title="Context Clues Set 3 (Medium)"
                    icon={Search}
                    color="bg-teal-600"
                    id="context-clues-3-medium"
                />
                <ActivityCard
                    title="Context Clues Set 3 (Hard)"
                    icon={Search}
                    color="bg-teal-700"
                    id="context-clues-3-hard"
                />
                <ActivityCard
                    title="Context Clues Set 2 (Easy)"
                    icon={Search}
                    color="bg-teal-500"
                    id="context-clues-2-easy"
                />
                <ActivityCard
                    title="Context Clues Set 2 (Medium)"
                    icon={Search}
                    color="bg-teal-600"
                    id="context-clues-2-medium"
                />
                <ActivityCard
                    title="Context Clues Set 2 (Hard)"
                    icon={Search}
                    color="bg-teal-700"
                    id="context-clues-2-hard"
                />
                <ActivityCard
                    title="Analogies"
                    icon={Brain}
                    color="bg-indigo-500"
                    id="analogies"
                />
                <ActivityCard
                    title="Synonyms (Thanksgiving)"
                    icon={MessageCircle}
                    color="bg-green-500"
                    id="synonyms"
                />
                <ActivityCard
                    title="Antonyms (Fall)"
                    icon={MessageCircle}
                    color="bg-orange-500"
                    id="antonyms"
                />
                <ActivityCard
                    title="Multiple Meanings"
                    icon={Brain}
                    color="bg-pink-500"
                    id="multiple-meanings"
                />
                <ActivityCard
                    title="Fall Nouns"
                    icon={MessageCircle}
                    color="bg-orange-600"
                    id="fall-nouns"
                />
                <ActivityCard
                    title="Fall Nouns (Quiz Mode)"
                    icon={MessageCircle}
                    color="bg-orange-700"
                    id="fall-nouns-quiz"
                />
                <ActivityCard
                    title="Reading Comprehension"
                    icon={BookOpen}
                    color="bg-blue-600"
                    id="reading-comprehension"
                />
                <ActivityCard
                    title="Sentence Builder (Middle)"
                    icon={MessageCircle}
                    color="bg-purple-600"
                    id="sentence-builder-middle"
                />
                <ActivityCard
                    title="Main Idea & Details"
                    icon={Brain}
                    color="bg-emerald-600"
                    id="main-idea-details"
                />
                <ActivityCard
                    title="Sentence Builder (Elem)"
                    icon={MessageCircle}
                    color="bg-cyan-500"
                    id="sentence-builder-elementary"
                />
                <ActivityCard
                    title="Multiple Meanings (Elem)"
                    icon={Split}
                    color="bg-violet-500"
                    id="multiple-meanings-elementary"
                />
                <ActivityCard
                    title="Social Stories (Elem)"
                    icon={Users}
                    color="bg-indigo-500"
                    id="social-stories-elementary"
                />


                <ActivityCard
                    title="Context Clues (Thanksgiving)"
                    icon={Search}
                    color="bg-amber-600"
                    id="thanksgiving-clues"
                />
                <ActivityCard
                    title="Inference Practice (Grade 9)"
                    icon={Brain}
                    color="bg-blue-600"
                    id="inference-clues"
                />
                <ActivityCard
                    title="Past Tense Verbs"
                    icon={MessageCircle}
                    color="bg-purple-600"
                    id="past-tense"
                />
                <ActivityCard
                    title="Context Clues Detective"
                    icon={Search}
                    color="bg-indigo-600"
                    id="detective-clues"
                />
                <ActivityCard
                    title="Multiple Meanings (Advanced)"
                    icon={Brain}
                    color="bg-pink-600"
                    id="multiple-meanings-advanced"
                />
                <ActivityCard
                    title="Plural Nouns Practice"
                    icon={MessageCircle}
                    color="bg-green-600"
                    id="plural-nouns"
                />
            </div>
        </Layout>
    );
}
