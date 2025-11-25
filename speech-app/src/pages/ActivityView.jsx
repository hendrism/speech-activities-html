import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { activityRegistry } from '../data/registry';

export default function ActivityView() {
  const { id } = useParams();
  const activity = activityRegistry[id];

  if (!activity) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Activity Not Found</h2>
          <Link to="/" className="text-blue-600 hover:underline">Return to Hub</Link>
        </div>
      </Layout>
    );
  }

  const ActivityComponent = activity.component;

  return (
    <Layout>
      <div className="mb-6">
        <Link to="/" className="text-slate-500 hover:text-blue-600 font-medium text-sm inline-flex items-center gap-1 transition-colors">
          ← Back to Hub
        </Link>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{activity.title}</h1>
        <p className="text-slate-600">{activity.subtitle}</p>
      </div>

      <ActivityComponent
        data={activity.data}
        {...activity.config}
      />
    </Layout>
  );
}
