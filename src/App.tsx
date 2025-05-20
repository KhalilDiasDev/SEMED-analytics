import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import SchoolComparison from './pages/SchoolComparison';
import SkillAnalysis from './pages/SkillAnalysis';
import DataUpload from './pages/DataUpload';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/comparison" element={<SchoolComparison />} />
          <Route path="/skills" element={<SkillAnalysis />} />
          <Route path="/upload" element={<DataUpload />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;