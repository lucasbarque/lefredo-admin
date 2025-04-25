import clsx from 'clsx';

interface StepperProps {
  steps: number;
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className='flex flex-col items-end justify-center'>
      <div className='flex w-full gap-3'>
        {[...Array(steps)].map((_, i) => (
          <div
            key={i}
            className={clsx('bg-line h-2 w-full rounded-full', {
              '!bg-brand-default': currentStep > i,
            })}
          />
        ))}
      </div>
      <div className='pt-1.5 text-sm font-bold'>
        Passo {currentStep} de {steps}
      </div>
    </div>
  );
}
