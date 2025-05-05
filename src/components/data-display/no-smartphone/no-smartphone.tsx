import Image from 'next/image';

export function NoSmartphone() {
  return (
    <div className='fixed inset-0 z-[99999999999999999999] flex flex-col items-center justify-center gap-2 bg-white px-4 text-center lg:hidden'>
      <Image
        src='/assets/images/no-smartphone.png'
        width={400}
        height={386}
        alt=''
      />
      <p className='text-4xl'>Oooops!</p>
      <p className='text-xl font-semibold'>
        O painel administrativo só pode ser acessado pelo computador
      </p>
    </div>
  );
}
