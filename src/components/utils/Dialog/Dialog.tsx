import React, { useEffect } from "react";
import { FocusTrap } from "focus-trap-react";
import { Portal } from "react-portal";

interface DialogProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  onClose,
  isOpen,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Dialog */}
        <FocusTrap
          focusTrapOptions={{
            initialFocus: false,
            fallbackFocus: "#dialog-close-button",
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
            <div className="bg-[#232323] rounded-lg shadow-xl mx-4">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="text-xl font-semibold text-white">{title}</div>
                <button
                  id="dialog-close-button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                  aria-label="Close dialog"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6 text-white">{children}</div>
            </div>
          </div>
        </FocusTrap>
      </div>
    </Portal>
  );
};
