import { ThumbsUp } from 'lucide-react';

const comments = [
  {
    id: 1,
    name: 'Yusuf Ade',
    avatar: '/c.jpg',
    text: 'This is an amazing post! Thanks for sharing this 💯',
    liked: false,
    likeCount: 2,
    time: '2h ago',
  },
  {
    id: 2,
    name: 'Lola Martins',
    avatar: '/d.jpg',
    text: 'Thanks for sharing this 💯',
    liked: true,
    likeCount: 5,
    time: '3h ago',
  },
  {
    id: 3,
    name: 'Yusuf Ade',
    avatar: '/c.jpg',
    text: 'This is an amazing post!',
    liked: false,
    likeCount: 2,
    time: '2h ago',
  },
  {
    id: 4,
    name: 'Lola Martins',
    avatar: '/d.jpg',
    text: 'Thanks for sharing this 💯 Thanks for sharing this 💯',
    liked: true,
    likeCount: 5,
    time: '3h ago',
  },
  {
    id: 5,
    name: 'Yusuf Ade',
    avatar: '/c.jpg',
    text: 'This is an amazing post! Thanks for sharing this 💯Thanks for sharing this 💯',
    liked: false,
    likeCount: 2,
    time: '2h ago',
  },
  {
    id: 6,
    name: 'Lola Martins',
    avatar: '/c.jpg',
    text: 'Thanks for sharing this 💯Thanks for sharing this 💯Thanks for sharing this 💯Thanks for sharing this 💯Thanks for sharing this 💯Thanks for sharing this 💯',
    liked: true,
    likeCount: 5,
    time: '3h ago',
  },
];

export default function CommentList() {
  return (
    <div className='pt-4 space-y-4 px-4'>
      {comments.map((comment) => (
        <div key={comment.id} className='flex gap-3'>
          {/* Avatar */}
          <img
            src={comment.avatar}
            alt={comment.name}
            className='w-10 h-10 rounded-full object-cover'
          />

          {/* Comment Content */}
          <div className=''>
            <div className='bg-gray-100 p-3 rounded-xl'>
              <p className='font-semibold text-sm text-gray-800'>
                {comment.name}
              </p>
              <p className='text-sm text-gray-700 mt-0.5'>{comment.text}</p>
            </div>

            {/* Footer */}
            <div className='flex items-center justify-between px-2'>
              <div className='flex items-center gap-4 mt-1 text-xs text-gray-500'>
                <button className='flex items-center gap-1 hover:text-blue-500 transition'>
                  Like
                </button>
                <span>{comment.time}</span>
              </div>
              <div className='flex items-center gap-x-[1px]'>
                <ThumbsUp className='w-3 h-3' />
                <span className='text-xs'>{comment.likeCount}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
