import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage/HomePage';
import { TaskPage } from '@/pages/TaskPage/TaskPage';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';

import '@/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/task/:id',
    element: <TaskPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
