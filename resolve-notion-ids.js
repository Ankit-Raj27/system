const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function run() {
  const sourceIds = [
    { name: "DSA", id: "306fec35-203f-8143-864f-000b2bdf74d5" },
    { name: "LLD", id: "309fec35-203f-8113-8881-000ba7dff905" },
    { name: "HLD", id: "309fec35-203f-8129-961e-000b157b1d0f" },
    { name: "COHORT", id: "309fec35-203f-8139-aaa3-000ba766e697" }
  ];

  for (const item of sourceIds) {
    try {
      const response = await notion.dataSources.retrieve({ data_source_id: item.id });
      console.log(`${item.name} Source ID: ${item.id} -> Database ID: ${response.database_id}`);
    } catch (err) {
      console.error(`${item.name} failed: ${err.message}`);
    }
  }
}

run();
