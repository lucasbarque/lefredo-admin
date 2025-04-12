'use server';

import {
  getAllCategoriesReport,
  getAllDishFlavorsReport,
  getAllDishesReport,
  hasActiveCategoryReport,
  hasLogoReport,
} from '@/http/api';

import { getCookiesHeader } from './utils.action';

export async function getAllCategoriesReportAPI() {
  const headers = await getCookiesHeader();

  const response = await getAllCategoriesReport(headers.menuid, {
    headers,
  });

  return response;
}

export async function getAllDishesReportAPI() {
  const headers = await getCookiesHeader();

  const response = await getAllDishesReport(headers.menuid, {
    headers,
  });

  return response;
}

export async function getAllDishFlavorsReportAPI() {
  const headers = await getCookiesHeader();

  const response = await getAllDishFlavorsReport(headers.menuid, {
    headers,
  });

  return response;
}

export async function hasLogoReportAPI() {
  const headers = await getCookiesHeader();

  const response = await hasLogoReport(headers.restaurantid, {
    headers,
  });

  return response;
}

export async function hasActiveCategoryReportAPI() {
  const headers = await getCookiesHeader();

  const response = await hasActiveCategoryReport(headers.menuid, {
    headers,
  });

  return response;
}
