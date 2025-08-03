'use client';
import { useState } from 'react';

export default function TextExpander({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [showFullText, setShowFullText] = useState(false);

  if (!text?.trim()) return null;

  const words = text.trim().split(' ');
  const wordLimit = 30;
  const isLong = words.length > wordLimit;

  return (
    <p className={`text-gray-900 ${className}`}>
      {isLong
        ? showFullText
          ? text
          : words.slice(0, wordLimit).join(' ') + '... '
        : text}
      {isLong && (
        <span
          className='text-blue-400 underline cursor-pointer italic ml-1'
          onClick={() => setShowFullText(!showFullText)}
        >
          {showFullText ? 'show less' : 'show more'}
        </span>
      )}
    </p>
  );
}
