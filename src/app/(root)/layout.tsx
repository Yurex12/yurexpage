import { Header } from '@/components/Header';
import { SideBar } from '@/components/SideBar';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='h-full pt-18'>
      <Header />
      <div className='max-w-[1600px] mx-auto grid grid-cols-[16rem_1fr] w-full h-full'>
        <SideBar />
        <main className='bg-gray-50 h-full overflow-y-scroll scrollbar-hide'>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
