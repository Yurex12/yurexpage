import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { X } from 'lucide-react';

type ConfirmActionProps = {
  open: boolean;
  name: string;
  handleLeavePost: () => void;
  handleConfirmationDialog: () => void;
};

export default function ConfirmAction({
  name,
  open,
  handleLeavePost,
  handleConfirmationDialog,
}: ConfirmActionProps) {
  return (
    <Dialog open={open} onOpenChange={handleConfirmationDialog}>
      <DialogOverlay className='bg-white/70' />
      <DialogContent
        className='w-full sm:max-w-md py-4 px-0 border-none outline-none rounded-2xl bg-white text-gray-800 shadow-2xl mx-auto '
        showCloseButton={false}
      >
        {/* Header */}
        <div className='flex items-center px-2'>
          <h2 className='text-xl font-semibold flex-1 text-center'>
            Leave {name}?
          </h2>

          <button
            onClick={handleConfirmationDialog}
            className='text-gray-500 justify-end hover:text-gray-800 transition'
          >
            <X size={20} />
          </button>
        </div>
        <div className='border border-gray-300'></div>

        <p className='text-sm leading-relaxed text-gray-600 px-2'>
          Progress on this {name} will not be saved. Would you like to keep
          editing or leave?
        </p>

        <div className='flex items-center justify-end space-x-4 px-2'>
          <button
            onClick={handleConfirmationDialog}
            className='px-4 py-2 text-sm rounded-lg border text-gray-700 hover:bg-gray-50 transition'
          >
            Stay on {name}
          </button>
          <button
            onClick={handleLeavePost}
            className='px-4 py-2 text-sm rounded-lg bg-primary text-white hover:opacity-90 transition'
          >
            Leave {name}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
