import { getCookiesHeader } from '@/actions/utils.action';
import { hasActiveCategoryReport } from '@/http/api';
import { NextResponse } from 'next/server';

export async function GET() {
  const headers = await getCookiesHeader();
  const response = await hasActiveCategoryReport(headers.menuid, { headers });
  return NextResponse.json(response.data, { status: response.status });
}
