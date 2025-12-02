import { Link } from 'react-router-dom';
import { BookOpen, Users, MessageCircle, Brain, PenTool, ArrowRight } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const categories = [
    {
        id: 'reading',
        title: 'Reading Comprehension',
        description: 'Stories, main ideas, and inference practice',
        icon: BookOpen,
        color: 'bg-orange-500',
        lightColor: 'bg-orange-50',
        textColor: 'text-orange-600'
    },
    {
        id: 'social',
        title: 'Social Problem Solving',
        description: 'Scenarios, social stories, and perspective taking',
        icon: Users,
        color: 'bg-indigo-500',
        lightColor: 'bg-indigo-50',
        textColor: 'text-indigo-600'
    },
    {
        id: 'language',
        title: 'Language & Vocabulary',
        description: 'Definitions, synonyms, antonyms, and context clues',
        icon: Brain,
        color: 'bg-emerald-500',
        lightColor: 'bg-emerald-50',
        textColor: 'text-emerald-600'
    },
    {
        id: 'articulation',
        title: 'Articulation & Fluency',
        description: 'Sentence building and conversation practice',
        icon: MessageCircle,
        color: 'bg-blue-500',
        lightColor: 'bg-blue-50',
        textColor: 'text-blue-600'
    },
    {
        id: 'grammar',
        title: 'Grammar',
        description: 'Verb tenses, plurals, and sentence structure',
        icon: PenTool,
        color: 'bg-rose-500',
        lightColor: 'bg-rose-50',
        textColor: 'text-rose-600'
    }
];

export default function Hub() {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-4 py-8">
                <h1 className="text-4xl font-bold text-slate-800">
                    Speech Therapy Activities
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Select a category to explore activities.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <Motion.div
                            key={category.id}
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Link
                                to={`/category/${category.id}`}
                                className="group block bg-white rounded-xl border border-slate-200 p-8 hover:shadow-lg hover:border-blue-200 transition-all duration-200 h-full"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`p-4 rounded-xl ${category.lightColor} ${category.textColor} group-hover:scale-110 transition-transform duration-200`}>
                                        <Icon size={32} />
                                    </div>
                                    <ArrowRight className="text-slate-300 group-hover:text-blue-500 transition-colors" size={24} />
                                </div>

                                <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">
                                    {category.title}
                                </h2>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    {category.description}
                                </p>
                            </Link>
                        </Motion.div>
                    );
                })}
            </div>
        </div>
    );
}
