import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type PostContextType = {
  openPostDialog: boolean;
  text: string;
  images: Image[];
  setImages: Dispatch<SetStateAction<Image[]>>;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  setText: Dispatch<SetStateAction<string>>;
};

type Image = {
  id: number;
  file: File;
  url: string | ArrayBuffer | null;
  name: string;
};

const postContext = createContext<PostContextType | null>(null);

export function PostProvider({ children }: { children: ReactNode }) {
  const [text, setText] = useState('');
  const [images, setImages] = useState<Image[]>([]);
  const [openPostDialog, setOpenPostDialog] = useState(false);
  function handlePostDialog() {}
  return (
    <postContext.Provider value={{ openPostDialog }}>
      {children}
    </postContext.Provider>
  );
}

export function usePost() {
  const context = useContext(postContext);
  if (!context) {
    throw new Error('PostContext was used outside post provider');
  }
  return context;
}
