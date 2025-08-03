import Posts from '@/components/Posts';
import Notifications from '@/components/Notifications';

export default function Home() {
  return (
    <section className='grid grid-cols-[1fr_30rem] h-full'>
      <Posts />
      <Notifications />
    </section>
  );
}
