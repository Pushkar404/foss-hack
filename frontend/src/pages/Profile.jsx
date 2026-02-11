import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AvatarPicker from '../components/AvatarPicker';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [categories, setCategories] = useState(user?.categories || []);
  const [newCategory, setNewCategory] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  if (!user) {
    return null;
  }

  const handleAddCategory = () => {
    const value = newCategory.trim();
    if (!value) return;
    if (!categories.includes(value)) {
      setCategories((prev) => [...prev, value]);
    }
    setNewCategory('');
  };

  const handleRemoveCategory = (value) => {
    setCategories((prev) => prev.filter((c) => c !== value));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await updateProfile({ name, avatar, categories });
      setMessage('Profile updated successfully');
    } catch {
      setMessage('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-50">Profile</h1>
        <p className="text-xs text-slate-400">Manage your personal information and categories.</p>
      </div>

      {message && (
        <div className="text-xs text-emerald-400 border border-emerald-500/60 bg-emerald-950/30 rounded-md px-3 py-2">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4 max-w-xl">
        <div className="space-y-1">
          <label className="block mb-1 text-sm text-slate-200">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <label className="block mb-1 text-sm text-slate-200">Email</label>
          <input type="email" value={user.email} disabled className="opacity-70" />
        </div>
        <AvatarPicker value={avatar} onChange={setAvatar} />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-200">Categories</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-200"
              >
                {cat}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(cat)}
                  className="text-slate-400 hover:text-red-400"
                >
                  ×
                </button>
              </span>
            ))}
            {!categories.length && (
              <p className="text-xs text-slate-500">No categories yet. Add one below.</p>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-50"
            >
              Add
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-sm font-semibold text-white"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;

