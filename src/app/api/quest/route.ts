import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { type, name, category, rank, status, url } = await req.json();

    let database_id = '';
    let props: any = {};

    switch (type) {
      case 'DSA':
        database_id = process.env.NOTION_DSA_DB_ID!;
        props = {
          "Quest": { title: [{ text: { content: name } }] },
          "Status": { select: { name: status || "Quest Available" } },
          "Rank": { select: { name: rank || "E-Rank (Easy)" } },
          "Dungeon": { select: { name: category } },
          "Portal": { url: url || "" }
        };
        break;
      case 'LLD':
        database_id = process.env.NOTION_LLD_DB_ID!;
        props = {
          "Quest": { title: [{ text: { content: name } }] },
          "Status": { select: { name: status || "Locked" } },
          "Rank": { select: { name: rank || "E-Rank (Concept)" } },
          "Category": { select: { name: category } }
        };
        break;
      case 'HLD':
        database_id = process.env.NOTION_HLD_DB_ID!;
        props = {
          "Concept": { title: [{ text: { content: name } }] },
          "Status": { select: { name: status || "Locked" } },
          "Rank": { select: { name: rank || "B-Rank (Basic)" } },
          "Topic": { select: { name: category } }
        };
        break;
    }

    if (!database_id) throw new Error("Invalid type");

    const response = await notion.pages.create({
      parent: { database_id },
      properties: props
    });

    return NextResponse.json({ success: true, id: response.id });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
