import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type TProfileDetails = {
  containerClassName?: string;
  innerContainerClassName?: string;
  userNameClassName?: string;
  profileNameClassName?: string;
  profileName: string;
  userName: string;
  imageClassName?: string;
  imageSrc: string;
};

export default function ProfileDetails({
  containerClassName,
  innerContainerClassName,
  profileNameClassName,
  userNameClassName,
  profileName,
  userName,
  imageClassName,
  imageSrc,
}: TProfileDetails) {
  return (
    <div className={containerClassName}>
      <div className={cn("flex", innerContainerClassName)}>
        <img
          src={imageSrc}
          alt={userName}
          className={cn(
            "-mt-8 flex size-20 items-center justify-center rounded-full",
            imageClassName,
          )}
        />
        <div className="flex flex-col px-2">
          <span
            className={cn(
              "text-lg font-bold text-gray-900",
              profileNameClassName,
            )}
          >
            {profileName}
          </span>
          <span className={cn("text-xs text-gray-500", userNameClassName)}>
            @{userName}
          </span>
        </div>
      </div>

      <div>
        <Button
          className="mt-2 rounded-full border border-gray-200 bg-transparent px-4 py-1 text-sm font-semibold text-gray-900 shadow-none hover:bg-gray-50"
          variant="outline"
        >
          Edit profile
        </Button>
      </div>
    </div>
  );
}
