import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), 'components', 'demo', 'test-orders.json');
    const data = await fs.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(data);

    // Get URLSearchParams to extract query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Extract filter parameters
    const statusFilter = searchParams.get('status') || '';
    const paymentStatusFilter = searchParams.get('paymentStatus') || '';
    const deliveryMethodFilter = searchParams.get('deliveryMethod') || '';

    // Validate page and limit values
    if (isNaN(page) || page <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid page number. Page must be a positive integer.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (isNaN(limit) || limit <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid limit number. Limit must be a positive integer.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Apply filters if they are provided, otherwise return all data
    let filteredData = parsedData;
    if (statusFilter || paymentStatusFilter || deliveryMethodFilter) {
      filteredData = parsedData.filter(item => {
        return (
          (statusFilter ? item.status === statusFilter : true) &&
          (paymentStatusFilter ? item.payment.status === paymentStatusFilter : true) &&
          (deliveryMethodFilter ? item.delivery.deliveryMethod === deliveryMethodFilter : true)
        );
      });
    }

    // Debug: Check filtered data
    console.log("🚀 ~ GET ~ filteredData:", filteredData);

    // Calculate start and end index for pagination
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, filteredData.length);

    // Ensure indexes are within bounds
    if (startIndex >= filteredData.length) {
      return new Response(JSON.stringify({ data: [], meta: {} }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Slice the data for the requested page
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Debug: Check paginated data
    console.log("🚀 ~ GET ~ paginatedData:", paginatedData);

    // Return the paginated data along with meta information
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
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    // Log error details for debugging purposes
    console.error("🚨 ~ GET ~ Error:", error);

    return new Response(JSON.stringify({ error: 'Failed to read data. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
