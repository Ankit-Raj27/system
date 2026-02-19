const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const NOTION_KEY = process.env.NOTION_API_KEY;
const STATE_FILE = path.join(__dirname, 'memory', 'achieve_state.json');
const MEMORY_FILE = path.join(__dirname, 'memory', '2026-02-19.md');

function loadState() {
  return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
}

function parseMemory() {
  const content = fs.readFileSync(MEMORY_FILE, 'utf8');
  const lunchMatch = content.match(/- Lunch: (.*)/);
  const breakfastMatch = content.match(/- Breakfast: (.*)/);
  return {
    lunch: lunchMatch ? lunchMatch[1] : 'Unknown',
    breakfast: breakfastMatch ? breakfastMatch[1] : 'Unknown'
  };
}

async function getActualDbId(logDbId) {
  const options = {
    hostname: 'api.notion.com',
    path: `/v1/data_sources/${logDbId}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${NOTION_KEY}`,
      'Notion-Version': '2025-09-03'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let resBody = '';
      res.on('data', d => resBody += d);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const dbInfo = JSON.parse(resBody);
          resolve(dbInfo.parent.database_id);
        } else {
          reject(new Error(resBody));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function updateNotion() {
  const state = loadState();
  const memory = parseMemory();
  const logDbId = state.notion.logs_db_id;

  const actualDbId = await getActualDbId(logDbId);

  console.log(`Updating Notion Database: ${actualDbId}`);

  const today = new Date().toISOString().split('T')[0];
  const data = JSON.stringify({
    parent: { database_id: actualDbId },
    properties: {
      "Date": { "title": [{ "text": { "content": today } }] },
      "Reason": { "rich_text": [{ "text": { "content": `B: ${memory.breakfast} | L: ${memory.lunch}` } }] }
    }
  });

  const options = {
    hostname: 'api.notion.com',
    path: '/v1/pages',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_KEY}`,
      'Notion-Version': '2025-09-03',
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let resBody = '';
      res.on('data', d => resBody += d);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log("Successfully updated Notion Battle Log.");
          resolve();
        } else {
          console.error("Failed to update Notion:", resBody);
          reject(new Error(resBody));
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

updateNotion().catch(console.error);
