// import { render, screen } from '@testing-library/react';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import MainPage from '../src/components/pages/MainPage';
// import ErrorUI from '../src/components/ErrorUI/ErrorUI';

// test('404 page is displayed when navigating to an invalid route', () => {
//   const badRoute = '/bad';

//   render(
//     <MemoryRouter initialEntries={[badRoute]}>
//       <Routes>
//         <Route
//           path="/"
//           element={<MainPage />}
//           errorElement={<ErrorUI errorMessage="" />}
//         />
//         <Route path="*" element={<ErrorUI errorMessage="Wrong path" />} />
//       </Routes>
//     </MemoryRouter>
//   );

//   expect(screen.getByTestId('error_element')).toBeInTheDocument();
// });
