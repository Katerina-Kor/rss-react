import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './components/App.tsx';
import './index.css';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from 'react-router-dom';
import MainPage from './components/pages/MainPage.tsx';
import DetailedPersonItem from './components/DetailedPersonItem/DetailedPersonItem.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<MainPage />}
      errorElement={
        <div className="wrapper_error">
          <p className="text_error">Sorry, something went wrong...</p>
          <button className="button button_restart">try again</button>
        </div>
      }
    >
      <Route index element={<DetailedPersonItem />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
