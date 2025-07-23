import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Mail, User } from 'lucide-react';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();//built in file reader lets you read file contents (images, PDFs, etc.)
    reader.readAsDataURL(file); //This reads the image file and converts it into a Base64 encoded string (data:image/jpeg;base64,...), which is a text version of the image — easy to preview and send over HTTP.
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image); // this was a bug; you used `selectedImage(...)` instead of `setSelectedImage`
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1c2c] to-[#928dab] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl text-white p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Profile</h2>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <img
              src={selectedImage || authUser?.profilePic || '/avatar.png'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-md"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition ${
                isUpdatingProfile ? 'pointer-events-none animate-pulse' : ''
              }`}
            >
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-white/70">
            {isUpdatingProfile ? 'Uploading...' : 'Click camera to update photo'}
          </p>
        </div>

        {/* User Info */}
        <div className="mt-8 space-y-5">
          <div className="flex items-center gap-3">
            <User className="text-white/70" />
            <div>
              <p className="text-sm text-white/60">Full Name</p>
              <p className="text-lg font-semibold">{authUser?.fullName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-white/70" />
            <div>
              <p className="text-sm text-white/60">Email Address</p>
              <p className="text-lg font-semibold">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-white/20 pt-4">
            <h3 className="text-sm text-white/60">Account Information</h3>
            <div className="mt-1 text-white">
              <span className="font-medium">Member since:</span>{' '}
              {authUser?.createdAt?.split('T')[0]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
