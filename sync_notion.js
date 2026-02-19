const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const NOTION_KEY = process.env.NOTION_API_KEY;
const STATE_FILE = path.join(__dirname, 'memory', 'achieve_state.json');
const MEMORY_FILE = path.join(__dirname, 'memory', '2026-02-19.md');

console.log('Build Environment Check:');
console.log('Current Dir:', __dirname);
if (fs.existsSync(STATE_FILE)) {
  console.log('STATE_FILE found at:', STATE_FILE);
} else {
  console.log('STATE_FILE MISSING at:', STATE_FILE);
  const files = fs.readdirSync(__dirname);
  console.log('Files in root:', files);
  if (fs.existsSync(path.join(__dirname, 'memory'))) {
     console.log('Memory folder exists. Files in memory:', fs.readdirSync(path.join(__dirname, 'memory')));
  }
}

function loadState() {
  return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
}

function parseMemory() {
  const content = fs.readFileSync(MEMORY_FILE, 'utf8');
  const lunchMatch = content.match(/- Lunch: (.*)/);
  const breakfastMatch = content.match(/- Breakfast: (.*)/);
  const wakeMatch = content.match(/- User woke up at (.*)/);
  
  return {
    lunch: lunchMatch ? lunchMatch[1] : 'Unknown',
    breakfast: breakfastMatch ? breakfastMatch[1] : 'Unknown',
    wakeTime: wakeMatch ? wakeMatch[1] : 'Unknown'
  };
}

async function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let resBody = '';
      res.on('data', d => resBody += d);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(resBody ? JSON.parse(resBody) : {});
        } else {
          reject(new Error(`Status ${res.statusCode}: ${resBody}`));
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
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
  const dbInfo = await request(options);
  return dbInfo.parent.database_id;
}

async function findExistingPage(dbId, date) {
  const options = {
    hostname: 'api.notion.com',
    path: `/v1/databases/${dbId}/query`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    }
  };
  const query = JSON.stringify({
    filter: {
      property: "Date",
      title: { equals: date }
    }
  });
  const result = await request(options, query);
  return result.results.length > 0 ? result.results[0].id : null;
}

async function updateNotion() {
  const state = loadState();
  const memory = parseMemory();
  const logDbId = state.notion.logs_db_id;

  const actualDbId = await getActualDbId(logDbId);
  const today = new Date().toISOString().split('T')[0];

  const existingPageId = await findExistingPage(actualDbId, today);

  let healthScore = 10;
  if (!memory.wakeTime.includes('05:00')) healthScore -= 2;
  if (memory.lunch.toLowerCase().includes('small chicken')) healthScore -= 2;

  const properties = {
    "Reason": { "rich_text": [{ "text": { "content": `B: ${memory.breakfast} | L: ${memory.lunch}` } }] },
    "Health Discipline": { "number": healthScore },
    "Learning Progress": { "number": 10 },
    "Work Output": { "number": 10 },
    "Overall Verdict": { "select": { "name": "SUCCESS" } }
  };

  if (existingPageId) {
    const options = {
      hostname: 'api.notion.com',
      path: `/v1/pages/${existingPageId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${NOTION_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      }
    };
    await request(options, JSON.stringify({ properties }));
  } else {
    properties["Date"] = { "title": [{ "text": { "content": today } }] };
    const options = {
      hostname: 'api.notion.com',
      path: '/v1/pages',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      }
    };
    await request(options, JSON.stringify({ parent: { database_id: actualDbId }, properties }));
  }
}

updateNotion().catch(err => {
  console.error(err);
  process.exit(1);
});
