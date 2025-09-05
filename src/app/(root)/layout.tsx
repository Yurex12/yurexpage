import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto h-full">
      <Header />
      <div className="mx-auto grid h-full w-full max-w-[1600px] pt-18 lg:grid-cols-[16rem_1fr]">
        <SideBar />
        <main className="scrollbar-hide h-full overflow-y-scroll bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
