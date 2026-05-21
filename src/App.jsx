import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import PageSkeleton from './components/PageSkeleton';

// Lazy load route chunks for optimal slow 3G performance
const CategorySelection = lazy(() => import('./pages/CategorySelection'));
const IssueDetails = lazy(() => import('./pages/IssueDetails'));
const SubmissionConfirmation = lazy(() => import('./pages/SubmissionConfirmation'));

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route 
            index 
            element={
              <Suspense fallback={<PageSkeleton />}>
                <CategorySelection />
              </Suspense>
            } 
          />
          <Route 
            path="details" 
            element={
              <Suspense fallback={<PageSkeleton />}>
                <IssueDetails />
              </Suspense>
            } 
          />
          <Route 
            path="confirmation" 
            element={
              <Suspense fallback={<PageSkeleton />}>
                <SubmissionConfirmation />
              </Suspense>
            } 
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
