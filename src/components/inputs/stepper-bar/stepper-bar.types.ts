type Item = {
  title: string;
  link: string;
};

export interface StepperBarProps {
  currentStepperIndex: number;
  items: Item[];
}
