import { Header } from '@/components/Header';
import { SideBar } from '@/components/SideBar';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='h-full mx-auto'>
      <Header />
      <div className='mx-auto grid lg:grid-cols-[16rem_1fr] w-full h-full pt-18 max-w-[1600px]'>
        <SideBar />
        <main className='bg-gray-50 h-full overflow-y-scroll scrollbar-hide'>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
