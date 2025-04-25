import { getCookiesHeader } from '@/actions/utils.action';
import { hasLogoReport } from '@/http/api';
import { NextResponse } from 'next/server';

export async function GET() {
  const headers = await getCookiesHeader();
  const response = await hasLogoReport(headers.restaurantid, { headers });
  return NextResponse.json(response.data, { status: response.status });
}
