import MobilePostDetials from '@/components/MobilePostDetials';

export default async function page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  return <MobilePostDetials />;
}
