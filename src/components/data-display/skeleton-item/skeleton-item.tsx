import { cn } from '@/lib/utils';

import { SkeletonItemProps } from './skeleton-item.types';

export function SkeletonItem({
  width,
  height,
  fullsize = false,
  className,
}: SkeletonItemProps) {
  return (
    <div
      style={{ maxWidth: fullsize ? '100%' : width, height }}
      className={cn('w-full animate-pulse rounded-md bg-slate-200', className)}
    />
  );
}
