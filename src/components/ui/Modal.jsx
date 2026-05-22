import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClass = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }[size];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal-panel ${sizeClass}`} onClick={(e) => e.stopPropagation()}>
        <div className="glass-modal rounded-2xl overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-glass-border">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="text-muted hover:text-primary transition">
              <X size={20} />
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};