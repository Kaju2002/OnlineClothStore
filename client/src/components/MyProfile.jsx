import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Editable profile state, initialized before any conditional return
  const [editProfile, setEditProfile] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: {
      street: '', city: '', state: '', zipCode: '', country: ''
    },
    preferences: { newsletter: false, notifications: false }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        if (response.ok && result.success) {
          setProfile(result.data.user);
        } else {
          setError(result.message || 'Failed to fetch profile');
        }
      } catch (err) {
        setError('Network error. Please try again.',err);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setEditProfile({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        dateOfBirth: profile.dateOfBirth || '',
        gender: profile.gender || '',
        address: profile.address || {
          street: '', city: '', state: '', zipCode: '', country: ''
        },
        preferences: profile.preferences || { newsletter: false, notifications: false }
      });
    }
  }, [profile]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setEditProfile(prev => ({
        ...prev,
        address: { ...prev.address, [key]: value }
      }));
    } else if (name.startsWith('preferences.')) {
      const key = name.split('.')[1];
      setEditProfile(prev => ({
        ...prev,
        preferences: { ...prev.preferences, [key]: type === 'checkbox' ? checked : value }
      }));
    } else {
      setEditProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setShowToast(false);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editProfile)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setProfile(result.data.user);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error("Update error:", error);
             }
    setUpdating(false);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-50 p-8 rounded-lg max-w-xl mx-auto shadow">
        <div className="flex flex-col items-center mb-8">
          <div className="relative group flex flex-col items-center">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <img
                src={profile.avatar?.url || window.avatarPreviewUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profile.fullName)}
                alt={profile.fullName}
                className="w-24 h-24 rounded-full object-cover border-4 border-black shadow-lg mb-4 group-hover:opacity-70 transition"
              />
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">Change</span>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  window.avatarPreviewUrl = URL.createObjectURL(file);
                  document.querySelector('#avatar-upload').parentElement.querySelector('img').src = window.avatarPreviewUrl;
                  const token = localStorage.getItem('authToken');
                  const formData = new FormData();
                  formData.append('avatar', file);
                  try {
                    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/upload-avatar`, {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${token}`
                      },
                      body: formData
                    });
                    const result = await response.json();
                    if (response.ok && result.success && result.data?.avatar?.url) {
                      setProfile(prev => ({ ...prev, avatar: result.data.avatar }));
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 3000);
                      window.avatarPreviewUrl = null;
                    }
                  } catch (error) {
                    console.error("Avatar upload error:", error);}
                }}
              />
            </label>
            {profile.avatar?.url && (
              <button
                type="button"
                className="absolute bottom-2 right-2 bg-white rounded-full p-0.5 shadow hover:bg-red-100 flex items-center justify-center"
                title="Delete Image"
                style={{ width: '28px', height: '28px' }}
                onClick={async () => {
                  const token = localStorage.getItem('authToken');
                  try {
                    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/avatar`, {
                      method: 'DELETE',
                      headers: {
                        'Authorization': `Bearer ${token}`
                      }
                    });
                    const result = await response.json();
                    if (response.ok && result.success) {
                      setProfile(prev => ({ ...prev, avatar: null }));
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 3000);
                    }
                  } catch (error) {
                    console.error("Avatar delete error:", error);
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7m5 4v6m-4-6v6m8-6v6" />
                </svg>
              </button>
            )}
          </div>
          <h3 className="text-2xl font-bold text-black mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{profile.fullName}</h3>
          <span className="text-sm text-gray-500 mb-2" style={{ fontFamily: 'Raleway, sans-serif' }}>{profile.email}</span>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-xs text-gray-500" style={{ fontFamily: 'Raleway, sans-serif' }}>First Name</label>
              <input
                type="text"
                name="firstName"
                value={editProfile?.firstName || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
            </div>
            <div>
              <label className="block mb-1 text-xs text-gray-500" style={{ fontFamily: 'Raleway, sans-serif' }}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={editProfile?.lastName || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
            </div>
            <div>
              <label className="block mb-1 text-xs text-gray-500" style={{ fontFamily: 'Raleway, sans-serif' }}>Phone</label>
              <input
                type="tel"
                name="phone"
                value={editProfile?.phone || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
            </div>
            <div>
              <label className="block mb-1 text-xs text-gray-500" style={{ fontFamily: 'Raleway, sans-serif' }}>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={editProfile?.dateOfBirth ? editProfile.dateOfBirth.slice(0,10) : ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              />
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-2">
              <label className="block mb-1 text-xs text-gray-500 col-span-5" style={{ fontFamily: 'Raleway, sans-serif' }}>Address</label>
              <input type="text" name="address.street" value={editProfile?.address?.street || ''} onChange={handleChange} placeholder="Street" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none col-span-2" style={{ fontFamily: 'Raleway, sans-serif' }} />
              <input type="text" name="address.city" value={editProfile?.address?.city || ''} onChange={handleChange} placeholder="City" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none" style={{ fontFamily: 'Raleway, sans-serif' }} />
              <input type="text" name="address.state" value={editProfile?.address?.state || ''} onChange={handleChange} placeholder="State" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none" style={{ fontFamily: 'Raleway, sans-serif' }} />
              <input type="text" name="address.zipCode" value={editProfile?.address?.zipCode || ''} onChange={handleChange} placeholder="Zip" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none" style={{ fontFamily: 'Raleway, sans-serif' }} />
              <input type="text" name="address.country" value={editProfile?.address?.country || ''} onChange={handleChange} placeholder="Country" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none" style={{ fontFamily: 'Raleway, sans-serif' }} />
            </div>
          </div>
          <button
            type="submit"
            disabled={updating}
            className="mt-8 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors w-full font-semibold"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            {updating ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
        {showToast && (
          <div className="fixed top-8 right-8 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg flex items-center space-x-3 animate-fade-in">
            <span style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}>
              Profile updated successfully!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;