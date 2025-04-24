import { SkeletonItem } from '@/components/data-display/skeleton-item/skeleton-item';

export function Skeleton() {
  return (
    <div className='flex animate-pulse flex-col'>
      <SkeletonItem width='266px' height='28px' />
      <SkeletonItem className='mt-6' width='103px' height='24px' />
      <SkeletonItem className='mt-1' width='640px' height='44px' />
      <SkeletonItem className='mt-2' width='283px' height='24px' />
      <SkeletonItem className='mt-1' width='640px' height='200px' />
      <SkeletonItem className='mt-2' width='490px' height='131px' />
      <SkeletonItem className='mt-2' width='163px' height='44px' />
    </div>
  );
}
