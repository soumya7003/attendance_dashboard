import { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { UserPlus, CreditCard } from 'lucide-react';

const DEPARTMENTS = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Electronics'];

const EMPTY_FORM = {
  roll: '',
  name: '',
  email: '',
  department: '',
  enrollmentStatus: 'active',
  cardUID: '',
};

export function AddStudentModal({ isOpen, onClose, onSubmit, editingStudent }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(editingStudent ?? EMPTY_FORM);
      setErrors({});
    }
  }, [isOpen, editingStudent]);

  const set = (key) => (e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!formData.roll.trim()) e.roll = 'Roll number is required';
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email address';
    if (!formData.department) e.department = 'Department is required';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const isEditing = !!editingStudent;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2">
          <UserPlus size={18} className="text-brand" />
          {isEditing ? 'Edit Student' : 'Add New Student'}
        </span>
      }
    >
      <div className="space-y-4">
        {/* Row: Roll + Status */}
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              label="Roll Number"
              placeholder="e.g. CS2024001"
              value={formData.roll}
              onChange={set('roll')}
              error={errors.roll}
            />
          </div>
          <div className="flex flex-col gap-1" style={{ minWidth: 140 }}>
            <label className="text-label">Status</label>
            <select
              className="input h-9"
              value={formData.enrollmentStatus}
              onChange={set('enrollmentStatus')}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Full Name */}
        <Input
          label="Full Name"
          placeholder="e.g. Aarav Sharma"
          value={formData.name}
          onChange={set('name')}
          error={errors.name}
        />

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          placeholder="student@university.edu"
          value={formData.email}
          onChange={set('email')}
          error={errors.email}
        />

        {/* Department */}
        <div className="flex flex-col gap-1">
          <label className="text-label">Department</label>
          <select
            className={`input ${errors.department ? 'border-danger' : ''}`}
            value={formData.department}
            onChange={set('department')}
          >
            <option value="">Select department…</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errors.department && (
            <span className="text-xs text-danger mt-0.5">{errors.department}</span>
          )}
        </div>

        {/* Card UID */}
        <div className="flex flex-col gap-1">
          <label className="text-label flex items-center gap-1">
            <CreditCard size={12} /> Card UID <span className="font-normal normal-case" style={{ letterSpacing: 0 }}>(optional)</span>
          </label>
          <Input
            placeholder="e.g. A3B2C1D0"
            value={formData.cardUID}
            onChange={set('cardUID')}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t" style={{ borderColor: 'var(--glass-border)' }}>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={loading}>
            {isEditing ? 'Save Changes' : 'Add Student'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}