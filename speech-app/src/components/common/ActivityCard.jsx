import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ActivityCard({ id, title, description, icon: Icon }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Link
                to={`/activity/${id}`}
                className="group block bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 h-full"
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                        {Icon && <Icon size={24} />}
                    </div>
                    <ArrowRight className="text-slate-300 group-hover:text-blue-500 transition-colors" size={20} />
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                    {title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    {description}
                </p>
            </Link>
        </motion.div>
    );
}
