const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function test() {
  try {
    const response = await notion.dataSources.query({
      data_source_id: process.env.NOTION_METRICS_DB_ID,
    });
    console.log("Results count:", response.results.length);
    if (response.results.length > 0) {
      console.log("First result properties:", JSON.stringify(response.results[0].properties, null, 2));
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

test();
