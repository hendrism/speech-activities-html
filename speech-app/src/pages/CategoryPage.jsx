import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Users, MessageCircle, Brain, PenTool } from 'lucide-react';
import { activityRegistry } from '../data/registry';
import ActivityCard from '../components/common/ActivityCard';
import { iconMap } from '../utils/iconMap';

const categoryConfig = {
    'reading': {
        title: 'Reading Comprehension',
        description: 'Stories, main ideas, and inference practice',
        icon: BookOpen,
        color: 'bg-orange-500'
    },
    'social': {
        title: 'Social Problem Solving',
        description: 'Scenarios, social stories, and perspective taking',
        icon: Users,
        color: 'bg-indigo-500'
    },
    'language': {
        title: 'Language & Vocabulary',
        description: 'Definitions, synonyms, antonyms, and context clues',
        icon: Brain,
        color: 'bg-emerald-500'
    },
    'articulation': {
        title: 'Articulation & Fluency',
        description: 'Sentence building and conversation practice',
        icon: MessageCircle,
        color: 'bg-blue-500'
    },
    'grammar': {
        title: 'Grammar',
        description: 'Verb tenses, plurals, and sentence structure',
        icon: PenTool,
        color: 'bg-rose-500'
    }
};

export default function CategoryPage() {
    const { categoryId } = useParams();
    const config = categoryConfig[categoryId];

    if (!config) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-slate-800">Category not found</h2>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
                    Return to Hub
                </Link>
            </div>
        );
    }

    const activities = Object.entries(activityRegistry)
        .map(([id, activity]) => ({ id, ...activity }))
        .filter(activity => activity.category === categoryId);

    const Icon = config.icon;

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    to="/"
                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                    <ArrowLeft size={24} className="text-slate-600" />
                </Link>
                <div className={`p-3 rounded-xl ${config.color} text-white shadow-lg`}>
                    <Icon size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">{config.title}</h1>
                    <p className="text-slate-600 text-lg">{config.description}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map((activity) => {
                    // Resolve icon component if it's a string name
                    const ActivityIcon = typeof activity.icon === 'string'
                        ? iconMap[activity.icon] || BookOpen
                        : activity.icon || BookOpen;

                    return (
                        <ActivityCard
                            key={activity.id}
                            id={activity.id}
                            title={activity.title}
                            description={activity.subtitle}
                            icon={ActivityIcon}
                            color={activity.color}
                        />
                    );
                })}
            </div>

            {activities.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                    <p className="text-slate-500 text-lg">No activities found in this category yet.</p>
                </div>
            )}
        </div>
    );
}
