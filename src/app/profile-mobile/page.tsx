import BackButton from "@/components/BackButton";
import CoverPhoto from "@/components/CoverPhoto";
import Posts from "@/components/Posts";
import ProfileDetails from "@/components/ProfileDetails";
import ProfileInfo from "@/components/ProfileInfo";
import ProfileTab from "@/components/ProfileTab";

export default function ProfilePage() {
  return (
    <div className="scrollbar-hide mx-auto flex h-full flex-col overflow-y-auto rounded-sm bg-gray-50 sm:max-w-140 sm:border sm:border-gray-200">
      {/* Header */}
      <div className="sticky top-0 flex w-full items-center gap-x-2 border-b border-b-gray-200 bg-gray-50 px-2 py-1">
        <BackButton />
        {/* <ArrowLeft /> */}
        <span className="text-base font-semibold text-gray-900">
          Alex&apos;s profile
        </span>
      </div>

      <CoverPhoto imageSrc="/c.jpg" imageAlt="coverphoto" />

      <ProfileDetails
        containerClassName="flex justify-between px-1"
        userNameClassName=""
        profileNameClassName=""
        innerContainerClassName=" flex-row"
        imageSrc="/b.jpg"
        imageClassName="md:-mt-20 md:size-40"
        profileName="Alex Johnson"
        userName="alexjohnson"
      />

      <ProfileInfo
        containerClassName="bg-none"
        bio="Full-stack developer 💻 | Coffee enthusiast ☕ | Building the future one line of code at a time 🚀"
        dateJoined="March 2019"
        totalPosts={4}
        totalPostsLikes={1.2}
      />

      <ProfileTab className="top-10 mt-6 w-auto bg-gray-50" />
      <Posts />
    </div>
  );
}
