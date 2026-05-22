import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Toggle } from '../../components/ui/Toggle';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Settings() {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: API call to update user profile
    console.log('Update profile:', formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient">Settings</h1>
        <p className="text-secondary text-sm mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card variant="default">
          <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </form>
        </Card>

        {/* Password Change */}
        <Card variant="default">
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>
          <form className="space-y-4">
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
            />
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <Input
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <Button variant="outline">Change Password</Button>
          </form>
        </Card>

        {/* Appearance */}
        <Card variant="default">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Dark Mode</p>
              <p className="text-xs text-muted">Toggle between light and dark theme</p>
            </div>
            <Toggle />
          </div>
        </Card>

        {/* Notifications Preferences */}
        <Card variant="default">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Email notifications for attendance alerts</span>
              <input type="checkbox" className="toggle-checkbox" defaultChecked />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Push notifications for new sessions</span>
              <input type="checkbox" className="toggle-checkbox" defaultChecked />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Device status warnings</span>
              <input type="checkbox" className="toggle-checkbox" />
            </label>
          </div>
        </Card>
      </div>
    </div>
  );
}