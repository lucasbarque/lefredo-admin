import { changeOnboardingStatusAPI } from '@/actions/users.action';
import { IconDeviceMobileSearch } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { RedirectType, redirect } from 'next/navigation';

import { Header } from '@/components/data-display/header';
import { Button } from '@/components/inputs/button';
import { Stepper } from '@/components/navigation/stepper';

const steps = [
  {
    title: 'Que tal aprender como criar seu primeiro cardápio?',
    description:
      'Essa será sua vitrine de produtos dentro do Le Fredo. É aqui que seu cliente irá visualizar tudo o que você vende em sua loja, então vamos caprichar!',
    imgPath: '/assets/images/preview-1.png',
  },
  {
    title: 'Primeiro, você cria a categoria de produtos do seu cardápio',
    description:
      'Elas ajudam a organizar os produtos em grupos, tornando mais fácil para seus clientes encontrarem o que procuram na loja.',
    imgPath: '/assets/images/preview-2.png',
  },
  {
    title: 'Adicione um produto na categoria que você criou',
    description:
      'Produtos são os itens que estarão listados dentro das categorias. Adicione fotos e descrição pra que eles fiquem mais atrativos!',
    imgPath: '/assets/images/preview-3.png',
  },
  {
    title: 'Deixe seu cliente<br/> com água na boca',
    description:
      'Coloque uma descrição detalhada do seu produto, observações, itens adicionais e muito mais, seus clientes podem personalizar e ter a melhor experiência.',
    imgPath: '/assets/images/preview-4.png',
  },
];

type SearchParams = Promise<{ step: string | undefined }>;

export default async function PageOnboarding(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const currentStep = Number(searchParams.step) || 1;

  if (currentStep === 5) {
    const response = await changeOnboardingStatusAPI();

    if (response.status === 200) {
      redirect('/first-category-create', RedirectType.replace);
    }
  }

  return (
    <section className='w-full'>
      <Header title='Criando meu cardápio' />

      <div className='pt-6'>
        <Stepper steps={steps.length} currentStep={currentStep} />
      </div>

      <div className='flex items-center justify-center gap-16'>
        <div className='w-full max-w-[22.938rem]'>
          <div
            className='text-title-default text-2xl font-bold'
            dangerouslySetInnerHTML={{ __html: steps[currentStep - 1].title }}
          />
          <p className='text-text-default pt-3 pb-8 text-lg'>
            {steps[currentStep - 1].description}
          </p>
          <div className='flex gap-3'>
            {currentStep > 1 && (
              <Link
                href={`/onboarding?step=${currentStep - 1}`}
                className='w-full'
              >
                <Button family='secondary' fullSize>
                  Voltar
                </Button>
              </Link>
            )}

            <Link
              href={`/onboarding?step=${currentStep + 1}`}
              className='w-full'
            >
              <Button fullSize>
                {currentStep === 1 || currentStep === steps.length
                  ? 'Vamos começar'
                  : 'Continuar'}
              </Button>
            </Link>
          </div>
        </div>
        <div className='flex flex-col gap-4 pt-6'>
          <Image
            className='drop-shadow-mobile'
            src={steps[currentStep - 1].imgPath}
            alt=''
            width={282}
            height={625}
          />
          <div className='border-line flex w-[280px] items-center gap-2 rounded-md border bg-gray-400 px-6 py-3 text-[10px] font-bold'>
            <IconDeviceMobileSearch size={24} className='shrink-0' />É mais ou
            menos assim que essas informações ficam no app do Le Fredo
          </div>
        </div>
      </div>
    </section>
  );
}
