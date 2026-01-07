import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hub from './pages/Hub';
import CategoryPage from './pages/CategoryPage';
import ActivityView from './pages/ActivityView';
import ScaffoldingHub from './features/scaffolding/ScaffoldingHub';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/activity/:id" element={<ActivityView />} />
          <Route path="/scaffolding" element={<ScaffoldingHub />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
