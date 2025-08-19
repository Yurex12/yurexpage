'use client';
import React, { useRef, useState } from 'react';

// Facebook-like Create Post (mobile)
// - No top bar (as requested)
// - Text + photos only
// - Auto-growing textarea (no internal scroll)
// - Parent container scrolls
// - Modern UX (focus handling improved)
// - Pure React + Tailwind

interface LocalImage {
  id: string;
  file: File;
  url: string;
}

export default function CreatePostMobile() {
  const [text, setText] = useState('');
  const [images, setImages] = useState<LocalImage[]>([]);
  const [isPosting, setIsPosting] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const autoResizeTextarea = (e?: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e?.currentTarget || textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  const handlePickPhotos = () => fileInputRef.current?.click();

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const next: LocalImage[] = files.map((file) => ({
      id: `${file.name}-${file.size}-${
        file.lastModified
      }-${crypto.randomUUID()}`,
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...next]);
    e.currentTarget.value = '';
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
  };

  const canPost = text.trim().length > 0 || images.length > 0;

  const handlePost = async () => {
    if (!canPost || isPosting) return;
    setIsPosting(true);

    await new Promise((r) => setTimeout(r, 800));

    setText('');
    setImages((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.url));
      return [];
    });

    setIsPosting(false);
    alert('Posted! (stub)');
  };

  return (
    <div className='w-full min-h-screen bg-background text-foreground'>
      <div className='mx-auto h-[92vh] max-w-md sm:max-w-sm md:max-w-md p-3'>
        <div className='flex h-full flex-col rounded-2xl border bg-white shadow-sm dark:bg-neutral-950 dark:border-neutral-800'>
          {/* Profile + Post button row */}
          <div className='flex items-center justify-between gap-3 px-4 py-3'>
            <div className='flex items-center gap-3'>
              <div className='h-9 w-9 shrink-0 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800' />
              <div className='leading-tight'>
                <div className='font-medium text-sm'>Your Name</div>
                <div className='text-xs text-neutral-500'>Friends</div>
              </div>
            </div>
            <button
              onClick={handlePost}
              disabled={!canPost || isPosting}
              className='rounded-full px-4 py-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 active:scale-[.99] transition'
            >
              {isPosting ? 'Posting…' : 'Post'}
            </button>
          </div>

          {/* Scrollable content */}
          <div
            className='flex-1 overflow-auto px-4 pb-28 pt-2'
            onClick={(e) => {
              // Only focus textarea if clicking directly on the div, not its children
              if (e.target === e.currentTarget) {
                textareaRef.current?.focus();
              }
            }}
          >
            {/* Textarea wrapper: only focus when empty area near text is clicked */}
            <div
              className='cursor-text hover:cursor-text'
              onClick={(e) => {
                // Only focus if click is NOT inside an image preview
                if ((e.target as HTMLElement).closest('[data-image-preview]'))
                  return;
                textareaRef.current?.focus();
              }}
            >
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  autoResizeTextarea(e);
                }}
                placeholder="What's on your mind?"
                rows={1}
                className='w-full resize-none overflow-hidden border-0 bg-transparent text-base outline-none placeholder:text-neutral-400 focus:ring-0 text-white'
              />

              {images.length > 0 && (
                <div className='mt-3'>
                  <ImagesMosaic images={images} onRemove={handleRemoveImage} />
                </div>
              )}
            </div>
          </div>

          {/* Bottom action bar */}
          <div className='sticky bottom-0 z-10 mt-auto border-t bg-white px-4 py-3 dark:bg-neutral-950 dark:border-neutral-800'>
            <div className='flex items-center justify-between'>
              <button
                onClick={handlePickPhotos}
                className='flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm shadow-sm hover:shadow-md active:scale-[.99] transition dark:border-neutral-800'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-5 w-5'
                >
                  <path d='M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75Zm8.25 3a.75.75 0 0 0-1.5 0v2.25H7.5a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0V13.5h2.25a.75.75 0 0 0 0-1.5h-2.25V9.75Zm5.028 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z' />
                </svg>
                Add photos
              </button>

              <div className='text-xs text-neutral-500'>Text & photos only</div>
            </div>

            <input
              ref={fileInputRef}
              type='file'
              multiple
              accept='image/*'
              onChange={handleFilesSelected}
              className='hidden'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ImagesMosaic({
  images,
  onRemove,
}: {
  images: LocalImage[];
  onRemove: (id: string) => void;
}) {
  const count = images.length;

  if (count === 1) {
    return (
      <div className='relative overflow-hidden rounded-2xl' data-image-preview>
        <img
          src={images[0].url}
          alt='upload'
          className='h-auto w-full object-cover'
        />
        <RemoveButton onClick={() => onRemove(images[0].id)} />
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className='grid grid-cols-2 gap-2'>
        {images.map((img) => (
          <div
            key={img.id}
            className='relative overflow-hidden rounded-xl'
            data-image-preview
          >
            <img
              src={img.url}
              alt='upload'
              className='aspect-square h-auto w-full object-cover'
            />
            <RemoveButton onClick={() => onRemove(img.id)} />
          </div>
        ))}
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className='grid grid-cols-2 gap-2'>
        <div
          className='relative col-span-2 overflow-hidden rounded-xl'
          data-image-preview
        >
          <img
            src={images[0].url}
            alt='upload'
            className='h-auto w-full object-cover'
          />
          <RemoveButton onClick={() => onRemove(images[0].id)} />
        </div>
        {images.slice(1).map((img) => (
          <div
            key={img.id}
            className='relative overflow-hidden rounded-xl'
            data-image-preview
          >
            <img
              src={img.url}
              alt='upload'
              className='aspect-square h-auto w-full object-cover'
            />
            <RemoveButton onClick={() => onRemove(img.id)} />
          </div>
        ))}
      </div>
    );
  }

  const firstFour = images.slice(0, 4);
  const extra = count - 4;

  return (
    <div className='grid grid-cols-2 gap-2'>
      {firstFour.map((img, idx) => (
        <div
          key={img.id}
          className='relative overflow-hidden rounded-xl'
          data-image-preview
        >
          <img
            src={img.url}
            alt='upload'
            className='aspect-square h-auto w-full object-cover'
          />
          <RemoveButton onClick={() => onRemove(img.id)} />
          {idx === 3 && extra > 0 && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
              <span className='text-white text-xl font-semibold'>+{extra}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-label='Remove image'
      className='absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white backdrop-blur-sm hover:bg-black/70'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='h-4 w-4'
      >
        <path d='M6.225 4.811A.75.75 0 0 1 6.97 4.5h10.06a.75.75 0 0 1 .745.86l-1.2 9.6a3 3 0 0 1-2.98 2.64H10.66a3 3 0 0 1-2.98-2.64l-1.2-9.6a.75.75 0 0 1 .745-.86Zm5.03 3.94a.75.75 0 0 0-1.06 0L8.47 10.5a.75.75 0 1 0 1.06 1.06L11 10.09l1.47 1.47a.75.75 0 1 0 1.06-1.06l-1.47-1.47 1.47-1.47A.75.75 0 1 0 12.47 7.75L11 9.22 9.53 7.75Z' />
      </svg>
    </button>
  );
}
