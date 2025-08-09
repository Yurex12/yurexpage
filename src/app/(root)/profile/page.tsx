'use client';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open Lightbox
      </button>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: '/c.jpg' }, { src: '/d.jpg' }, { src: '/yusuf.jpg' }]}
        className='bg-red-500'
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      />
    </>
  );
}
