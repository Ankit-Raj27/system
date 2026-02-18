const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: "2022-06-28"
});

async function run() {
  try {
    const response = await notion.search({
      filter: { value: 'database', property: 'object' }
    });
    console.log(JSON.stringify(response.results.map(r => ({ 
      title: r.title[0]?.plain_text, 
      id: r.id 
    })), null, 2));
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();
