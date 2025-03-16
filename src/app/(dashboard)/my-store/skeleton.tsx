export function Skeleton() {
  return (
    <div className='flex animate-pulse flex-col'>
      <div className='h-[28px] w-[266px] rounded-md bg-slate-200' />

      <div className='mt-6 h-[24px] w-[103px] rounded-md bg-slate-200' />
      <div className='mt-1 h-[44px] w-[640px] rounded-md bg-slate-200' />

      <div className='mt-2 h-[24px] w-[283px] rounded-md bg-slate-200' />
      <div className='mt-1 h-[200px] w-[640px] rounded-md bg-slate-200' />

      <div className='mt-2 h-[131px] w-[490px] rounded-md bg-slate-200' />

      <div className='mt-2 h-[44px] w-[163px] rounded-md bg-slate-200' />
    </div>
  );
}
