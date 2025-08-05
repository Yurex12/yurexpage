import EngagementActions from './EngagementActions';
import EngagementStats from './EngagementStats';
import ImageGrid from './ImageGrid';
import PostHeader from './PostHeader';
import TextExpander from './TextExpander';

export default function Post() {
  return (
    <div className='bg-white rounded-lg shadow max-w-140 pt-4 pb-2 mx-auto space-y-3'>
      <PostHeader />
      <TextExpander
        className='text-xs text-foreground px-4 leading-4'
        text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptas repellendus necessitatibus, reprehenderit inventore sit autem aliquid rerum cumque dolor quisquam, architecto assumenda amet fugit aut similique quas beatae natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptas repellendus necessitatibus, reprehenderit inventore sit autem aliquid rerum cumque dolor quisquam, architecto assumenda amet fugit aut similique quas beatae natus.'
      />
      <ImageGrid images={['/d.jpg', '/c.jpg']} />
      <EngagementStats />
      <div className='border rounded-lg border-gray-300'></div>
      <EngagementActions />
    </div>
  );
}
