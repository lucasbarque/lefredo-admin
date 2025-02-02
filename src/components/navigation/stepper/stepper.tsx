import clsx from 'clsx';

interface StepperProps {
  steps: number;
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className='flex flex-col items-end justify-center'>
      <div className='flex gap-3 w-full'>
        {[...Array(steps)].map((_, i) => (
          <div
            key={i}
            className={clsx('h-2 w-full bg-line rounded-full', {
              '!bg-brand-default': currentStep > i,
            })}
          />
        ))}
      </div>
      <div className='font-bold text-sm pt-1.5'>
        Passo {currentStep} de {steps}
      </div>
    </div>
  );
}
