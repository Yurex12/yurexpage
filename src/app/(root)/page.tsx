import Posts from '@/components/Posts';
import Notifications from '@/components/Notifications';

export default function Home() {
  return (
    <section className='grid 3xl:grid-cols-[1fr_30rem] 2xl:grid-cols-[1fr_25rem] xl:grid-cols-[1fr_20rem] lg:grid-cols-1 sm:px-4 h-full gap-x-2'>
      <Posts />
      <Notifications className='hidden xl:block py-4' />
    </section>
  );
}
