import Layout from '../components/layout/Layout';
import ActivityCard from '../components/common/ActivityCard';
import { Layout as LayoutIcon, MessageSquare, BookOpen, Brain, Search, MessageCircle, Split, Users } from 'lucide-react';
import { activityRegistry } from '../data/registry';

const iconMap = {
    'Layout': LayoutIcon,
    'MessageSquare': MessageSquare,
    'BookOpen': BookOpen,
    'Brain': Brain,
    'Search': Search,
    'MessageCircle': MessageCircle,
    'Split': Split,
    'Users': Users
};

export default function Hub() {
    // Get all activities from registry
    const activities = Object.entries(activityRegistry).map(([id, activity]) => ({
        id,
        ...activity
    }));

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
                {activities.map((activity) => {
                    // Resolve icon component if it's a string name
                    const IconComponent = typeof activity.icon === 'string'
                        ? iconMap[activity.icon] || BookOpen
                        : activity.icon || BookOpen;

                    return (
                        <ActivityCard
                            key={activity.id}
                            id={activity.id}
                            title={activity.title}
                            description={activity.subtitle}
                            icon={IconComponent}
                            color={activity.color}
                        />
                    );
                })}
            </div>
        </Layout>
    );
}

