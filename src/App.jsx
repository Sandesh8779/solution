import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import UserDashboard from './pages/UserDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Register from './pages/Register';
import ServiceRequestForm from './pages/ServiceRequestForm';
import ChatWidget from './components/ChatWidget';
import { NotificationProvider } from './context/NotificationContext';

const MainLayout = ({ children }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Navbar />
    <main style={{ flex: 1 }}>{children}</main>
    <ChatWidget />
    <footer style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--color-bg-primary)', borderTop: '1px solid var(--color-border)' }}>
      <p style={{ color: 'var(--color-text-secondary)' }}>&copy; 2026 Solution For U. All rights reserved.</p>
    </footer>
  </div>
);

function App() {
  return (
    <Router>
      <NotificationProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/service/:serviceId" element={<ServiceRequestForm />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/worker/dashboard" element={<WorkerDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </MainLayout>
      </NotificationProvider>
    </Router>
  );
}

export default App;
