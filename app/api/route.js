"use server"
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const filePath = path.join(process.cwd(), 'components', 'demo', 'test-orders.json');
    const data = await fs.readFile(filePath, 'utf8');
    console.log("🚀 ~ GET ~ data:", data)
    const parsedData = JSON.parse(data);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const statusFilter = searchParams.get('status') || '';
    const paymentStatusFilter = searchParams.get('paymentStatus') || '';
    const deliveryMethodFilter = searchParams.get('deliveryMethod') || '';

    if (isNaN(page) || page <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid page number.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    if (isNaN(limit) || limit <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid limit number.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    let filteredData = parsedData.filter(item => {
      return (
        (!statusFilter || item.status === statusFilter) &&
        (!paymentStatusFilter || item.payment.status === paymentStatusFilter) &&
        (!deliveryMethodFilter || item.delivery.deliveryMethod === deliveryMethodFilter)
      );
    });

    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, filteredData.length);

    if (startIndex >= filteredData.length) {
      return new Response(JSON.stringify({ data: [], meta: {} }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const paginatedData = filteredData.slice(startIndex, endIndex);

    return new Response(
      JSON.stringify({
        data: paginatedData,
        meta: {
          totalItems: filteredData.length,
          currentPage: page,
          totalPages: Math.ceil(filteredData.length / limit),
          pageSize: limit,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error:", error.message); // Log detailed error message
    return new Response(JSON.stringify({ error: 'Failed to read data. Please try again later.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
