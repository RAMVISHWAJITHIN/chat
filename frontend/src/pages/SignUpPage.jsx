import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, User, Mail, Lock, Loader } from 'lucide-react';
import AuthImagePattern from '../components/AuthImagePattern';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const trimmedData = {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
    };
    await signup(trimmedData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/10">

        {/* Left - Sign Up Form */}
        <div className="flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Your Account</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block text-sm text-white/70 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-white/60" size={18} />
                  <input
                    type="text"
                    placeholder="John Appleseed"
                    className="w-full bg-white/10 border border-white/20 text-white pl-10 pr-4 py-2 rounded-xl placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:outline-none"
                    {...register('fullName', {
                      required: 'Full name is required',
                      pattern: {
                        value: /^[a-zA-Z ]+$/,
                        message: 'Only letters and spaces allowed',
                      },
                      validate: val => val.trim() === val || 'Remove spaces',
                    })}
                  />
                </div>
                {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-white/70 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-white/60" size={18} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-white/10 border border-white/20 text-white pl-10 pr-4 py-2 rounded-xl placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:outline-none"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email format',
                      },
                      validate: val => val.trim() === val || 'Remove spaces',
                    })}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-white/70 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-white/60" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full bg-white/10 border border-white/20 text-white pl-10 pr-10 py-2 rounded-xl placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:outline-none"
                    {...register('password', {
                      required: 'Password is required',
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{6,}$/,
                        message: 'Use at least 6 chars (1 uppercase, 1 lowercase, 1 number, 1 symbol)',
                      },
                      validate: val => val.trim() === val || 'Remove spaces',
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-white/70 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold py-2 rounded-xl transition duration-300 backdrop-blur flex items-center justify-center gap-2"
                disabled={isSigningUp}
              >
                {isSigningUp && <Loader className="animate-spin" size={18} />}
                {isSigningUp ? 'Signing Up...' : 'Sign Up'}
              </button>

              {/* Redirect */}
              <div className="mt-6 text-sm text-white/70 text-center">
                Already have an account?{' '}
                <a href="/login" className="text-blue-400 hover:underline">Login</a>
              </div>
            </form>
          </div>
        </div>

        {/* Right - Auth Image Pattern */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
          <AuthImagePattern
            title="Welcome to Chatter"
            subtitle="Connect, chat and share your moments in real time!"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;



