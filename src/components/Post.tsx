'use client';

import EngagementActions from './EngagementActions';
import EngagementStats from './EngagementStats';
import ImageGrid from './ImageGrid';
import PostHeader from './PostHeader';
import TextExpander from './TextExpander';

const slides: { src: string }[] = [{ src: '/d.jpg' }, { src: '/c.jpg' }];

export default function Post() {
  return (
    <div className='bg-white rounded-lg shadow max-w-140 pt-4 pb-2 mx-auto space-y-2 sm:space-y-3'>
      <PostHeader />
      <TextExpander
        className='px-4'
        text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptas repellendus necessitatibus, reprehenderit inventore sit autem aliquid rerum cumque dolor quisquam, architecto assumenda amet fugit aut similique quas beatae natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptas repellendus necessitatibus, reprehenderit inventore sit autem aliquid rerum cumque dolor quisquam, architecto assumenda amet fugit aut similique quas beatae natus.'
      />
      <ImageGrid images={slides} />
      <EngagementStats />
      <div className='border rounded-lg border-gray-300'></div>
      <EngagementActions />
    </div>
  );
}
