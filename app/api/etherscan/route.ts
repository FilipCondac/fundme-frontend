import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");
  const action = searchParams.get("action");

  if (!address || !action) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 },
    );
  }

  const apiKey = process.env.ETHERSCAN_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Etherscan API key not configured" },
      { status: 500 },
    );
  }

  try {
    const { data } = await axios.get("https://api.etherscan.io/v2/api", {
      params: {
        chainid: 11155111,
        module: "account",
        action,
        address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 100,
        sort: "desc",
        apikey: apiKey,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch from Etherscan" },
      { status: 500 },
    );
  }
}
