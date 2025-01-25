import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Log the Redis REST URL to verify connectivity
   //console.log(process.env.UPSTASH_REDIS_REST_URL);

    // Fetch the members of the Redis set "allusers"
    const response = await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/smembers/allusersdata`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    // Parse the response JSON
    const data = await response.json();
    //console.log(data);

    // Check if result exists and is an array
    if (!Array.isArray(data.result) || data.result.length === 0) {
      return new NextResponse("No users found", { status: 404 });
    }

    // Return the result
    return NextResponse.json(data.result, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
