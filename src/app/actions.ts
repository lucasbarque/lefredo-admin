'use server';

import { getSectionsAPI } from '@/actions/section.action';
import { revalidatePath } from 'next/cache';

export async function revalidateSectionsWithItems() {
  await getSectionsAPI();
  revalidatePath('/menu-list');
}
