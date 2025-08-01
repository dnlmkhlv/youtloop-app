"use client";

interface ModalProps {
  showModal: boolean;
  modalMessage: string;
  isDarkMode: boolean;
  closeModal: () => void;
}

export default function Modal({
  showModal,
  modalMessage,
  isDarkMode,
  closeModal,
}: ModalProps) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`max-w-md w-full mx-4 rounded-lg shadow-xl transition-all duration-300 ${
          isDarkMode
            ? "bg-[#1f1f1f] border border-[#272727]"
            : "bg-white border border-[#e5e5e5]"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-[#0f0f0f]"
              }`}
            >
              Invalid URL
            </h3>
            <button
              onClick={closeModal}
              className={`p-1 rounded-full transition-colors ${
                isDarkMode
                  ? "hover:bg-[#272727] text-gray-400 hover:text-white"
                  : "hover:bg-[#f2f2f2] text-[#606060] hover:text-[#0f0f0f]"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p
            className={`mb-6 ${
              isDarkMode ? "text-gray-300" : "text-[#606060]"
            }`}
          >
            {modalMessage}
          </p>
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-300"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
