const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DSA_ID = "306fec35-203f-817f-9bad-e6c6e6132583";
const LLD_ID = "309fec35-203f-8173-ac36-f4845b00cb3e";
const HLD_ID = "309fec35-203f-815d-9977-f470ca45db25";
const COHORT_ID = "309fec35-203f-810f-b14c-c85c69b855eb";

const DSA_QUESTS = [
  { name: "Two Sum", dungeon: "Arrays", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/two-sum/" },
  { name: "Contains Duplicate", dungeon: "Arrays", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/contains-duplicate/" },
  { name: "Valid Anagram", dungeon: "Arrays", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/valid-anagram/" },
  { name: "Group Anagrams", dungeon: "Arrays", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/group-anagrams/" },
  { name: "Top K Frequent Elements", dungeon: "Arrays", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
  { name: "Valid Palindrome", dungeon: "Two Pointers", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/valid-palindrome/" },
  { name: "3Sum", dungeon: "Two Pointers", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/3sum/" },
  { name: "Best Time to Buy and Sell Stock", dungeon: "Sliding Window", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { name: "Longest Substring Without Repeating Characters", dungeon: "Sliding Window", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
  { name: "Valid Parentheses", dungeon: "Stack", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/valid-parentheses/" },
  { name: "Binary Search", dungeon: "Binary Search", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/binary-search/" },
  { name: "Reverse Linked List", dungeon: "Linked List", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/reverse-linked-list/" },
  { name: "Linked List Cycle", dungeon: "Linked List", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/linked-list-cycle/" },
  { name: "Invert Binary Tree", dungeon: "Trees", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/invert-binary-tree/" },
  { name: "Maximum Depth of Binary Tree", dungeon: "Trees", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
  { name: "Subsets", dungeon: "Backtracking", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/subsets/" },
  { name: "Number of Islands", dungeon: "Graphs", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/number-of-islands/" },
  { name: "Climbing Stairs", dungeon: "1-D DP", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/climbing-stairs/" },
  { name: "Coin Change", dungeon: "1-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/coin-change/" },
  { name: "Search a 2D Matrix", dungeon: "Binary Search", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/search-a-2d-matrix/" },
  { name: "Merge Intervals", dungeon: "Intervals", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/merge-intervals/" },
  { name: "Counting Bits", dungeon: "Bit Manipulation", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/counting-bits/" },
  { name: "Missing Number", dungeon: "Bit Manipulation", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/missing-number/" },
  { name: "Longest Repeating Character Replacement", dungeon: "Sliding Window", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
  { name: "Permutation in String", dungeon: "Sliding Window", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/permutation-in-string/" },
  { name: "Product of Array Except Self", dungeon: "Arrays", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/product-of-array-except-self/" },
  { name: "Unique Paths", dungeon: "2-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/unique-paths/" },
  { name: "Jump Game", dungeon: "Greedy", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/jump-game/" },
  { name: "Pacific Atlantic Water Flow", dungeon: "Graphs", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
  { name: "Course Schedule", dungeon: "Graphs", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/course-schedule/" }
];

const LLD_QUESTS = [
  { name: "Design a Parking Lot", category: "OOD", rank: "S-Rank (Interview)" },
  { name: "Design an Elevator System", category: "OOD", rank: "S-Rank (Interview)" },
  { name: "Design Splitwise", category: "OOD", rank: "S-Rank (Interview)" },
  { name: "Design a Logging Framework", category: "Design Pattern", rank: "C-Rank (Implementation)" },
  { name: "Design Vending Machine", category: "OOD", rank: "S-Rank (Interview)" },
  { name: "Singleton Pattern implementation", category: "Design Pattern", rank: "E-Rank (Concept)" },
  { name: "Factory Pattern implementation", category: "Design Pattern", rank: "C-Rank (Implementation)" },
  { name: "Observer Pattern implementation", category: "Design Pattern", rank: "C-Rank (Implementation)" },
  { name: "Design Chess Game", category: "OOD", rank: "S-Rank (Interview)" },
  { name: "Design Library Management", category: "OOD", rank: "C-Rank (Implementation)" }
];

const HLD_QUESTS = [
  { name: "Design a URL Shortener", topic: "Real System", rank: "A-Rank (Intermediate)" },
  { name: "Design a Rate Limiter", topic: "Real System", rank: "S-Rank (Advanced)" },
  { name: "Design WhatsApp Chat System", topic: "Real System", rank: "S-Rank (Advanced)" },
  { name: "Design Netflix Video Streaming", topic: "Real System", rank: "S-Rank (Advanced)" },
  { name: "Consistent Hashing Implementation", topic: "Scalability", rank: "A-Rank (Intermediate)" },
  { name: "Database Sharding Strategies", topic: "Database", rank: "A-Rank (Intermediate)" },
  { name: "Load Balancing Algorithms", topic: "Scalability", rank: "B-Rank (Basic)" },
  { name: "Caching with Redis", topic: "Core Concept", rank: "B-Rank (Basic)" },
  { name: "Microservices Architecture", topic: "Core Concept", rank: "A-Rank (Intermediate)" },
  { name: "Distributed Locking", topic: "Core Concept", rank: "S-Rank (Advanced)" }
];

async function run() {
  console.log("Populating Quests...");
  
  for (const q of DSA_QUESTS) {
    await notion.pages.create({
      parent: { database_id: DSA_ID },
      properties: {
        "Quest": { title: [{ text: { content: q.name } }] },
        "Status": { select: { name: "Quest Available" } },
        "Rank": { select: { name: q.rank } },
        "Dungeon": { select: { name: q.dungeon } },
        "Portal": { url: q.url }
      }
    });
    process.stdout.write(".");
  }

  for (const q of LLD_QUESTS) {
    await notion.pages.create({
      parent: { database_id: LLD_ID },
      properties: {
        "Quest": { title: [{ text: { content: q.name } }] },
        "Status": { select: { name: "Locked" } },
        "Rank": { select: { name: q.rank } },
        "Category": { select: { name: q.category } }
      }
    });
    process.stdout.write(".");
  }

  for (const q of HLD_QUESTS) {
    await notion.pages.create({
      parent: { database_id: HLD_ID },
      properties: {
        "Concept": { title: [{ text: { content: q.name } }] },
        "Status": { select: { name: "Locked" } },
        "Rank": { select: { name: q.rank } },
        "Topic": { select: { name: q.topic } }
      }
    });
    process.stdout.write(".");
  }
  
  console.log("\nPopulation Complete.");
}

run();
