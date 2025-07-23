import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Mail, Lock, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import AuthImagePattern from '../components/AuthImagePattern';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = ({ email, password }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      return false;
    }

    if (password.trim().length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      await login(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center p-6">
      
      {/* Left Side - Login Box */}
      <div className="w-full max-w-md mx-auto backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl rounded-3xl px-8 py-10 text-white">
        <h1 className="text-4xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-white/70 text-sm text-center mb-8">
          Sign in to continue your conversations.
        </p>

        <form onSubmit={handleSubmitForm} className="space-y-6">

          {/* Email Field */}
          <div>
            <label className="block text-sm mb-1 text-white/80">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-white/60" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-white/10 text-white pl-10 pr-4 py-2 rounded-xl border border-white/20 placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:outline-none"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm mb-1 text-white/80">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-white/60" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-white/10 text-white pl-10 pr-10 py-2 rounded-xl border border-white/20 placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/70 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-2 rounded-xl backdrop-blur transition duration-300 flex items-center justify-center gap-2"
          >
            {isLoggingIn && <Loader className="animate-spin" size={18} />}
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-sm text-white/70 text-center">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-400 hover:underline">Sign up</a>
        </div>
      </div>

      {/* Right Side - Auth Pattern */}
      <div className="hidden md:block">
        <AuthImagePattern
          title="Welcome back!"
          subtitle="Sign in to continue your conversations and catch up with your messages."
        />
      </div>
    </div>
  );
};

export default LoginPage;




