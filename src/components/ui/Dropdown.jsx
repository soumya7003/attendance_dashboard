import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';

export const Dropdown = ({ trigger, items, align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className={`dropdown-menu absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2`}>
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              {item.divider ? (
                <div className="dropdown-divider" />
              ) : (
                <button
                  className={`dropdown-item ${item.danger ? 'danger' : ''}`}
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                >
                  {item.icon && <item.icon size={16} />}
                  {item.label}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.elementType,
      onClick: PropTypes.func,
      danger: PropTypes.bool,
      divider: PropTypes.bool,
    })
  ),
  align: PropTypes.oneOf(['left', 'right']),
};