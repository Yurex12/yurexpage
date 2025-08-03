import { X } from 'lucide-react';
import React from 'react';

interface ConfirmExitCardProps {
  onCancel: () => void;
  onContinue: () => void;
}

const ConfirmExitCard: React.FC<ConfirmExitCardProps> = ({
  onCancel,
  onContinue,
}) => {
  return (
    <div className='w-full max-w-lg py-4 rounded-2xl bg-white text-gray-800 shadow-2xl mx-auto space-y-2'>
      {/* Header */}
      <div className='flex items-center px-2'>
        <h2 className='text-xl font-semibold flex-1 text-center'>
          Leave post?
        </h2>

        <button
          onClick={onCancel}
          className='text-gray-500 justify-end hover:text-gray-800 transition'
        >
          <X size={20} />
        </button>
      </div>
      <div className='border border-gray-300'></div>

      <p className='text-sm leading-relaxed text-gray-600 px-2'>
        Progress on this post will not be saved. Would you like to keep editing
        or leave?
      </p>

      <div className='flex items-center justify-end space-x-3 px-2'>
        <button
          onClick={onCancel}
          className='px-4 py-1 text-sm rounded-lg border text-gray-700 hover:bg-gray-50 transition'
        >
          Stay on post
        </button>
        <button
          onClick={onContinue}
          className='px-5 py-1 text-sm rounded-lg bg-primary text-white hover:opacity-90 transition'
        >
          Leave post
        </button>
      </div>
    </div>
  );
};

export default ConfirmExitCard;
