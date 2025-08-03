import { Copy, Edit, Ellipsis, Trash } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

export default function PostDropdownActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='bg-white hover:bg-gray-100 border-0 outline-0 p-2 rounded-full transition-colors'>
          <Ellipsis className='w-5 h-5 text-gray-600' />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side='bottom'
        align='end'
        className='bg-white shadow-xl border border-gray-100 rounded-lg p-1 w-48'
      >
        <DropdownMenuItem className='flex items-center border-0 outline-0 gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-sm text-gray-700 cursor-pointer transition'>
          <Copy className='w-4 h-4 text-gray-500' />
          <span>Copy link</span>
        </DropdownMenuItem>

        <DropdownMenuItem className='flex items-center border-0 outline-0 gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-sm text-gray-700 cursor-pointer transition'>
          <Edit className='w-4 h-4 text-gray-500' />
          <span>Edit post</span>
        </DropdownMenuItem>

        <DropdownMenuItem className='flex items-center gap-3 border-0 outline-0 px-3 py-2 rounded-md hover:bg-red-50 text-sm text-red-600 cursor-pointer transition'>
          <Trash className='w-4 h-4 text-red-500' />
          <span>Delete post</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
