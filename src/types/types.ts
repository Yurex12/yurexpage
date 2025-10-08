import { User } from "@/lib/auth";
import { LucideProps } from "lucide-react";

import { Prisma } from "@/generated/prisma/client";

import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
} from "react";

export type Link = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export type Image = {
  id: number;
  file: File;
  url: string | ArrayBuffer | null;
  name: string;
};

export type CreatePostDialogProps = {
  text: string;
  images: Image[];
  setText: Dispatch<SetStateAction<string>>;
  setImages: Dispatch<SetStateAction<Image[]>>;
};

export type Tab = ["posts", "images"];

export type EditUsernameFormProps = {
  showSkipOption?: boolean;
  user: User;
};

export type ImageUploadResponse = {
  fileId: string;
  name: string;
  url: string;
};

export type PostWithRelations = Prisma.PostGetPayload<{
  include: {
    postLikes: true;
    comments: true;
    images: true;
    notifications: {
      select: {
        type: true;
        id: true;
      };
    };
    user: {
      select: {
        name: true;
        displayUsername: true;
        image: true;
      };
    };
    _count: {
      select: {
        comments: true;
        postLikes: true;
      };
    };
  };
}>;

export type CommentsWithRelations = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: {
        displayUsername: true;
        name: true;
        image: true;
      };
    };
  };
}>;
