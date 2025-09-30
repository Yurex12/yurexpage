import { User } from "@/lib/auth";
import { LucideProps } from "lucide-react";
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
