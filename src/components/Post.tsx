'use client';

import { useState } from 'react';
import EngagementActions from './EngagementActions';
import EngagementStats from './EngagementStats';
import ImageGrid from './ImageGrid';
import PostHeader from './PostHeader';
import TextExpander from './TextExpander';
import Lightbox from 'yet-another-react-lightbox';

export default function Post() {
  const [openPhoto, setOpenPhoto] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const slides: { src: string }[] = [{ src: '/d.jpg' }, { src: '/c.jpg' }];

  const handleOpen = (index: number) => {
    setPhotoIndex(index); // set the clicked image index
    setOpenPhoto(true);
  };
  return (
    <div className='bg-white rounded-lg shadow max-w-140 pt-4 pb-2 mx-auto space-y-2 sm:space-y-3'>
      <PostHeader />
      <TextExpander
        className='px-4'
        text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptas repellendus necessitatibus, reprehenderit inventore sit autem aliquid rerum cumque dolor quisquam, architecto assumenda amet fugit aut similique quas beatae natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptas repellendus necessitatibus, reprehenderit inventore sit autem aliquid rerum cumque dolor quisquam, architecto assumenda amet fugit aut similique quas beatae natus.'
      />
      <ImageGrid images={slides} handleOpenPhoto={handleOpen} />
      <EngagementStats />
      <div className='border rounded-lg border-gray-300'></div>
      <EngagementActions />
      <Lightbox
        open={openPhoto}
        close={() => setOpenPhoto(false)}
        slides={slides}
        index={photoIndex} // starting slide index
        controller={{ closeOnBackdropClick: true }}
      />
    </div>
  );
}
