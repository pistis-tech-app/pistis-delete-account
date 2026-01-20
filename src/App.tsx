import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CheckEmailPage } from './pages/CheckEmailPage';
import { ConfirmDeletePage } from './pages/ConfirmDeletePage';
import { SuccessPage } from './pages/SuccessPage';

function App() {
  return (
    <BrowserRouter basename="/Pistis-users-data-management">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
        <Route path="/user/delete-request" element={<ConfirmDeletePage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
