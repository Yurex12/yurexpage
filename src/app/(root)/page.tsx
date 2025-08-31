import Posts from "@/components/Posts";
import Notifications from "@/components/Notifications";

export default function Home() {
  return (
    <section className="3xl:grid-cols-[1fr_30rem] grid h-full gap-x-2 sm:px-4 lg:grid-cols-1 xl:grid-cols-[1fr_20rem] 2xl:grid-cols-[1fr_25rem]">
      <Posts className="scrollbar-hide overflow-y-scroll sm:pt-4 xl:mt-4 xl:pt-0" />
      <Notifications className="hidden py-4 xl:block" />
    </section>
  );
}
