import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'max-w-lg',
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative w-full ${maxWidth} bg-white dark:bg-[#111418] border border-gray-200 dark:border-white/10 rounded-[24px] p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150 text-gray-900 dark:text-[#F5F1E8]`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-gray-200 dark:border-white/[0.08]">
          <div>
            {title && (
              <h3 id="modal-title" className="text-lg font-bold text-gray-900 dark:text-[#F5F1E8]">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-gray-600 dark:text-[#C7C2B6] mt-0.5">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-[#8C877D] hover:text-gray-900 dark:hover:text-[#F5F1E8] p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 text-gray-600 dark:text-[#C7C2B6] text-sm">
          {children}
        </div>

        {/* Footer */}
        {footer ? (
          <div className="pt-4 border-t border-gray-200 dark:border-white/[0.08] flex items-center justify-end gap-3">
            {footer}
          </div>
        ) : (
          <div className="pt-4 border-t border-gray-200 dark:border-white/[0.08] flex items-center justify-end">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
