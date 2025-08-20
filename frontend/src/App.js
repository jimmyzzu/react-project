import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import DetailsPage from './pages/DetailsPage';
import CalendarPage from './pages/CalendarPage';
import KanbanPage from './pages/KanbanPage';
import ActivityStreamPage from './pages/ActivityStreamPage';
import ApprovalPage from './pages/ApprovalPage';
import Main from './Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/kanban" element={<KanbanPage />} />
        <Route path="/activity" element={<ActivityStreamPage />} />
        <Route path="/approvals" element={<ApprovalPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
