import Post from './Post';
import CreatePost from './CreatePost';

export default function Posts() {
  return (
    <div className='space-y-2 sm:space-y-4 sm:pt-4 flex-1 overflow-y-scroll pb-4 scrollbar-hide'>
      <CreatePost />
      <div className='space-y-2 sm:space-y-4'>
        {[1, 2, 3, 4].map((num) => (
          <Post key={num} />
        ))}
      </div>
    </div>
  );
}
