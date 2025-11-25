import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors">
                        <Home size={20} />
                        <span className="font-semibold">Speech Activities</span>
                    </Link>
                    <div className="text-sm text-slate-500">
                        v2.0 (React)
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
