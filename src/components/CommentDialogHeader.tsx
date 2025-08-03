import { X } from 'lucide-react';

import { DialogClose } from '@radix-ui/react-dialog';

export default function CommentDialogHeader() {
  return (
    <div className='flex items-center shadow-sm bg-white w-full px-2 py-4'>
      <h2 className='text-gray-900 font-bold text-lg flex-1 flex items-center justify-center'>
        Yusuf&apos;s Post
      </h2>
      <DialogClose className='bg-white hover:bg-gray-100 border-0 outline-0 p-2 rounded-full transition-colors'>
        <X className='w-5 h-5 text-gray-900' />
      </DialogClose>
    </div>
  );
}
