import CoverPhoto from "@/components/CoverPhoto";
import PageHeader from "@/components/PageHeader";
import Posts from "@/components/Posts";
import ProfileDetails from "@/components/ProfileDetails";
import ProfileInfo from "@/components/ProfileInfo";
import ProfileTab from "@/components/ProfileTab";

export default function ProfilePage() {
  return (
    <div className="scrollbar-hide mx-auto flex h-full flex-col overflow-y-auto md:space-y-2 md:px-4">
      <PageHeader
        title="Alex's Profile"
        containerClassName="sticky top-0 md:mt-4 md:rounded-md md:py-4 bg-white"
      />

      <CoverPhoto
        className="md:h-60"
        imageSrc="./c.jpg"
        imageAlt="Cover photo"
      />

      <ProfileDetails
        containerClassName="flex justify-between px-2 md:px-4"
        innerContainerClassName="flex-col md:flex-row"
        imageSrc="/b.jpg"
        imageClassName="md:-mt-20 md:size-40"
        profileName="Alex Johnson"
        userName="alexjohnson"
        userNameClassName="md:text-sm"
        profileNameClassName="md:text-2xl lg:text-3xl"
      />

      <div className="mt-2 grid gap-y-4 md:grid-cols-2 md:gap-x-10 md:py-4">
        <div>
          <ProfileInfo
            containerClassName="md:sticky md:top-20 md:border md:bg-white md:py-4 md:border-gray-200 md:rounded-md"
            bio="Full-stack developer 💻 | Coffee enthusiast ☕ | Building the future one line of code at a time 🚀"
            dateJoined="March 2019"
            totalPosts={4}
            totalPostsLikes={1.2}
          />
        </div>

        <div className="space-y-4">
          <ProfileTab className="top-8 max-w-140 rounded-md bg-white md:top-4" />
          <Posts />
        </div>
      </div>
    </div>
  );
}
