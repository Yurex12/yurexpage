import { Send } from 'lucide-react';

type TCreatePostFooter = {
  text: string;
  imageLength: number;
  handleUploadPost: VoidFunction;
};

export default function CreatePostFooter({
  text,
  imageLength,
  handleUploadPost,
}: TCreatePostFooter) {
  return (
    <div className='flex items-center justify-end border-t border-gray-100 bg-gray-50 rounded-b-2xl pt-4'>
      <div className='flex items-center space-x-3'>
        <button
          onClick={handleUploadPost}
          disabled={!text.trim() && imageLength === 0}
          className='flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100'
        >
          <Send className='w-4 h-4' />
          <span>Post</span>
        </button>
      </div>
    </div>
  );
}
