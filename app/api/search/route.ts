import { PageResult, SearchParams } from "@/typings";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { searchTerm, pages, ...params } = await req.json();
  console.log(searchTerm);

  const searchParams: SearchParams = params;

  if (!searchTerm) {
    return NextResponse.next(
      new Response("Missing search term", { status: 400 })
    );
  }

  const filters: any = [];

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (key === "maxPrice") {
        if ((value = "1000+")) return;
      }
    }

    filters.push({
      key,
      value: key === "sortBy" ? value : Number.parseInt(value),
    });
  });

  // Ref: https://docs.oxylabs.io/wmw8gbrbnajdf87/scraper-apis/e-commerce-scraper-api/google-shopping/shopping-search
  const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
    method: "POST",
    body: JSON.stringify({
      source: "google_shopping_search",
      domain: "com",
      query: searchTerm,
      pages: Number.parseInt(pages) || 1,
      context: filters,
      parse: true,
      render: "html",
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.OXYLABS_USERNAME}:${process.env.OXYLABS_PASSWORD}`
        ).toString("base64"),
    },
    cache: "no-store",
  });

  const data = await response.json();
  //   console.log(data);

  const pageResults: PageResult[] = data.results;

  return NextResponse.json(pageResults);
}
