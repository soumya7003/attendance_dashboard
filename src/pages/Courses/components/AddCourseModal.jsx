import { useState, useEffect, useRef } from 'react';

import Modal  from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input  from '../../components/ui/Input';
import Select from '../../components/ui/Select';

import courseService        from '../../services/courseService';
import { validateRequired } from '../../utils/validators';

// ─── Constants ─────────────────────────────────────────────────────────────────
const DEPARTMENTS = [
  'Science',
  'Arts',
  'Engineering',
  'Commerce',
  'Mathematics',
  'Computer Science',
  'Information Technology',
  'Electronics',
  'Mechanical',
  'Civil',
];

const EMPTY_FORM   = { code: '', name: '', department: '' };
const EMPTY_ERRORS = { code: '', name: '', department: '' };

// ─── Helpers ───────────────────────────────────────────────────────────────────
function validateForm({ code, name, department }) {
  return {
    code:       validateRequired(code)       ? '' : 'Course code is required.',
    name:       validateRequired(name)       ? '' : 'Course name is required.',
    department: validateRequired(department) ? '' : 'Please select a department.',
  };
}

function hasErrors(errs) {
  return Object.values(errs).some(Boolean);
}

// ─── Component ─────────────────────────────────────────────────────────────────
/**
 * AddCourseModal
 *
 * @param {{
 *   open: boolean,
 *   onClose: () => void,
 *   onSave:  () => void,
 * }} props
 */
export default function AddCourseModal({ open, onClose, onSave }) {
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [errors,      setErrors]      = useState(EMPTY_ERRORS);
  const [submitting,  setSubmitting]  = useState(false);
  const [serverError, setServerError] = useState('');

  const firstInputRef = useRef(null);

  // Reset & focus every time the modal opens.
  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setErrors(EMPTY_ERRORS);
      setServerError('');
      setSubmitting(false);
      setTimeout(() => firstInputRef.current?.focus(), 50);
    }
  }, [open]);

  // ─── Field handler ────────────────────────────────────────────────────────
  const handleChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field])  setErrors((prev) => ({ ...prev, [field]: '' }));
    if (serverError)    setServerError('');
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e?.preventDefault();

    const newErrors = validateForm(form);
    setErrors(newErrors);
    if (hasErrors(newErrors)) return;

    setSubmitting(true);
    setServerError('');

    try {
      await courseService.create({
        code:       form.code.trim().toUpperCase(),
        name:       form.name.trim(),
        department: form.department,
      });

      onSave?.();
      onClose?.();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong. Please try again.';
      setServerError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <Modal open={open} onClose={onClose} title="Add Course">
      <form onSubmit={handleSubmit} noValidate>

        <div className="space-y-4">

          <Input
            ref={firstInputRef}
            label="Course Code"
            placeholder="e.g. PHY202"
            value={form.code}
            onChange={handleChange('code')}
            error={errors.code}
            required
            autoComplete="off"
          />

          <Input
            label="Course Name"
            placeholder="e.g. Physics 202"
            value={form.name}
            onChange={handleChange('name')}
            error={errors.name}
            required
            autoComplete="off"
          />

          <Select
            label="Department"
            placeholder="Select a department"
            value={form.department}
            onChange={handleChange('department')}
            options={DEPARTMENTS.map((d) => ({ label: d, value: d }))}
            error={errors.department}
            required
          />

          {/* Server-level error banner (e.g. "Course code already exists") */}
          {serverError && (
            <div
              role="alert"
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#f87171',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span aria-hidden="true">⚠</span> {serverError}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            loading={submitting}
            disabled={submitting}
          >
            Save Course
          </Button>
        </div>

      </form>
    </Modal>
  );
}