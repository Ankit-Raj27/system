const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function discover() {
  try {
    const response = await notion.search({
      filter: { value: 'data_source', property: 'object' }
    });
    console.log(JSON.stringify(response.results.map(r => ({ 
      name: r.title[0]?.plain_text, 
      id: r.id 
    })), null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

discover();
