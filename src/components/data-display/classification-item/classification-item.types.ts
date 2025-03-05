import { ReactNode } from 'react';

import { DishSpecKey } from '@/http/api';

export interface ClassificatinItemProps {
  dishId: string;
  title: string;
  description: string;
  icon: ReactNode;
  isActive?: boolean;
  hashKey: DishSpecKey;
}
