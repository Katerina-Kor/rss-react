import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from 'react-router-dom';
import MainPage from './components/pages/MainPage.tsx';
import DetailedPersonItem from './components/DetailedPersonItem/DetailedPersonItem.tsx';
import ErrorUI from './components/ErrorUI/ErrorUI.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<MainPage />}
        errorElement={<ErrorUI errorMessage="" />}
      >
        <Route index element={<DetailedPersonItem />}></Route>
      </Route>
      <Route path="*" element={<ErrorUI errorMessage="Wrong path" />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
