import CoverPhoto from "@/components/CoverPhoto";
import PageHeader from "@/components/PageHeader";
import Posts from "@/components/Posts";
import ProfileDetails from "@/components/ProfileDetails";
import ProfileInfo from "@/components/ProfileInfo";
import Tab from "@/components/Tab";

const tabs = ["posts", "images"];

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { tab: activeTab } = await searchParams;
  return (
    <div className="scrollbar-hide mx-auto flex h-full flex-col overflow-y-auto md:space-y-2 md:px-4">
      <PageHeader
        title="Alex's Profile"
        containerClassName="md:mt-4 md:rounded-md md:py-4 bg-white md:sticky md:top-0"
      />

      <CoverPhoto imageSrc="./c.jpg" imageAlt="Cover photo" />

      <ProfileDetails
        imageSrc="/b.jpg"
        profileName="Alex Johnson"
        userName="alexjohnson"
      />

      <div className="mt-2 grid gap-y-4 md:grid-cols-2 md:gap-x-10 md:py-4">
        <div>
          <ProfileInfo
            bio="Full-stack developer 💻 | Coffee enthusiast ☕ | Building the future one line of code at a time 🚀"
            dateJoined="March 2019"
            totalPosts={4}
            totalPostsLikes={1.2}
          />
        </div>

        <div className="space-y-4">
          <Tab
            tabs={tabs}
            activeTabClassName="bg-blue-100 text-blue-700"
            linkClassName="hover:text-accent-foreground  rounded-full py-2 px-4 font-semibold hover:bg-blue-200 dark:hover:bg-blue-100"
            containerClassName="sticky flex gap-x-2 px-2 py-2 top-0 max-w-140 rounded-md bg-white md:top-2"
          />
          {activeTab === "posts" && <Posts />}
          {activeTab === "images" && <p>Hello world</p>}
        </div>
      </div>
    </div>
  );
}
