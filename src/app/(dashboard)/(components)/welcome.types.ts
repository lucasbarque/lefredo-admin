export type GetStartedTypes = 'category' | 'upload' | 'dish' | 'active';

export interface GetStatedItemProps {
  isChecked?: boolean;
  title: string;
  text: string;
  type: GetStartedTypes;
}

export interface Steps {
  title: string;
  text: string;
  type: GetStartedTypes;
  isChecked: boolean;
}
