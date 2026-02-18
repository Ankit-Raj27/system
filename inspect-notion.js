const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

if (notion.dataSources) console.log("Notion.dataSources properties:", Object.keys(notion.dataSources));
