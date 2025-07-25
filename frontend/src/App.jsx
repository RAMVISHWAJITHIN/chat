
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore'
function App() {
const {theme}=useThemeStore()
const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore()
  console.log({ onlineUsers });
useEffect(()=>{
  checkAuth();

},[checkAuth])
// console.log({authUser})
if (isCheckingAuth && !authUser) {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  );
}

  return (
    <div data-theme={theme} >
       <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={authUser?<HomePage />:<Navigate to ="/login"/>} />
        <Route path="/signup" element={!authUser?<SignUpPage />:<Navigate to="/"/>} />
        <Route path="/login" element={!authUser?<LoginPage />:<Navigate to="/"/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to ="/login"/>} />
      </Routes>
    </div>
  )
}

export default App
