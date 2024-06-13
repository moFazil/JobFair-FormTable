import './App.css';
import CandidateTable from './component/CanditateTable';
import Dashboard from './component/Dashboard';
import Sidebar from './component/Sidebar';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/table" element={<CandidateTable />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
