import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import CategorySelection from './pages/CategorySelection';
import IssueDetails from './pages/IssueDetails';
import SubmissionConfirmation from './pages/SubmissionConfirmation';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<CategorySelection />} />
          <Route path="details" element={<IssueDetails />} />
          <Route path="confirmation" element={<SubmissionConfirmation />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
