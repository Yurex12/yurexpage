import { Button } from "./ui/button";

type TProfileDetails = {
  profileName: string;
  userName: string;
  imageSrc: string;
};

export default function ProfileDetails({
  profileName,
  userName,
  imageSrc,
}: TProfileDetails) {
  return (
    <div className="flex justify-between px-2 md:px-4">
      <div className="flex flex-col md:flex-row">
        <img
          src={imageSrc}
          alt={userName}
          className="-mt-8 flex size-20 items-center justify-center rounded-full md:-mt-20 md:size-40"
        />
        <div className="flex flex-col px-2">
          <span className="text-lg font-bold text-gray-900 md:text-2xl lg:text-3xl">
            {profileName}
          </span>
          <span className="text-xs text-gray-500 md:text-sm">@{userName}</span>
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
