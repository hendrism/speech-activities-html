import Layout from '../components/layout/Layout';
import ActivityCard from '../components/common/ActivityCard';
import { BookOpen, MessageCircle, Mic, Brain, Layout, Search } from 'lucide-react';

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
                    icon={Layout}
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
            </div>
        </Layout>
    );
}
