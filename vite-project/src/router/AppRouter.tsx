import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/pages/MainPage';
import ErrorUI from '../components/ErrorUI/ErrorUI';
import DetailedPersonItem from '../components/DetailedPersonItem/DetailedPersonItem';
import { FC } from 'react';

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage />}
        errorElement={<ErrorUI errorMessage="" />}
      >
        <Route index element={<DetailedPersonItem />} />
      </Route>
      <Route path="*" element={<ErrorUI errorMessage="Wrong path" />} />
    </Routes>
  );
};

export default AppRouter;
