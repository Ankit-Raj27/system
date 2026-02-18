import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getMetrics() {
  // @ts-ignore
  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_METRICS_DB_ID!,
  });
  return response.results;
}

export async function getLogs() {
  // @ts-ignore
  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_LOGS_DB_ID!,
    sorts: [{ property: "Date", direction: "descending" }],
  });
  return response.results;
}

export async function getTrends() {
  // @ts-ignore
  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_TREND_DB_ID!,
    sorts: [{ property: "Week", direction: "ascending" }],
  });
  return response.results;
}
