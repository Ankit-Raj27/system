const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DSA_ID = "306fec35-203f-817f-9bad-e6c6e6132583";

const EXTRA_QUESTIONS = [
  // Two Pointers
  { name: "Trapping Rain Water", dungeon: "Two Pointers", rank: "S-Rank (Hard)", url: "https://leetcode.com/problems/trapping-rain-water/" },
  { name: "Two Sum II - Input Array Is Sorted", dungeon: "Two Pointers", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
  
  // Sliding Window
  { name: "Best Time to Buy and Sell Stock", dungeon: "Sliding Window", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { name: "Longest Repeating Character Replacement", dungeon: "Sliding Window", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
  
  // Stack
  { name: "Generate Parentheses", dungeon: "Stack", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/generate-parentheses/" },
  { name: "Car Fleet", dungeon: "Stack", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/car-fleet/" },
  
  // Binary Search
  { name: "Search in Rotated Sorted Array", dungeon: "Binary Search", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
  { name: "Time Based Key-Value Store", dungeon: "Binary Search", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/time-based-key-value-store/" },
  
  // Linked List
  { name: "Copy List with Random Pointer", dungeon: "Linked List", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
  { name: "Add Two Numbers", dungeon: "Linked List", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/add-two-numbers/" },
  { name: "Find the Duplicate Number", dungeon: "Linked List", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/find-the-duplicate-number/" },
  
  // Trees
  { name: "Binary Tree Level Order Traversal", dungeon: "Trees", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
  { name: "Binary Tree Right Side View", dungeon: "Trees", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/binary-tree-right-side-view/" },
  { name: "Count Good Nodes in Binary Tree", dungeon: "Trees", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/" },
  { name: "Validate Binary Search Tree", dungeon: "Trees", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/validate-binary-search-tree/" },
  
  // Backtracking
  { name: "Subsets II", dungeon: "Backtracking", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/subsets-ii/" },
  { name: "Combination Sum II", dungeon: "Backtracking", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/combination-sum-ii/" },
  { name: "Word Search", dungeon: "Backtracking", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/word-search/" },
  { name: "Palindrome Partitioning", dungeon: "Backtracking", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/palindrome-partitioning/" },
  
  // Graphs
  { name: "Surrounded Regions", dungeon: "Graphs", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/surrounded-regions/" },
  { name: "Pacific Atlantic Water Flow", dungeon: "Graphs", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
  { name: "Course Schedule", dungeon: "Graphs", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/course-schedule/" },
  { name: "Number of Connected Components in an Undirected Graph", dungeon: "Graphs", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" },
  
  // Advanced Graphs
  { name: "Reconstruct Itinerary", dungeon: "Advanced Graphs", rank: "S-Rank (Hard)", url: "https://leetcode.com/problems/reconstruct-itinerary/" },
  { name: "Min Cost to Connect All Points", dungeon: "Advanced Graphs", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/min-cost-to-connect-all-points/" },
  { name: "Network Delay Time", dungeon: "Advanced Graphs", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/network-delay-time/" },
  
  // 1-D DP
  { name: "Word Break", dungeon: "1-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/word-break/" },
  { name: "Longest Increasing Subsequence", dungeon: "1-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
  { name: "Partition Equal Subset Sum", dungeon: "1-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/partition-equal-subset-sum/" },
  
  // 2-D DP
  { name: "Unique Paths", dungeon: "2-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/unique-paths/" },
  { name: "Longest Common Subsequence", dungeon: "2-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/longest-common-subsequence/" },
  { name: "Best Time to Buy and Sell Stock with Cooldown", dungeon: "2-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/" },
  { name: "Coin Change II", dungeon: "2-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/coin-change-ii/" },
  { name: "Target Sum", dungeon: "2-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/target-sum/" },
  
  // Greedy
  { name: "Jump Game", dungeon: "Greedy", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/jump-game/" },
  { name: "Jump Game II", dungeon: "Greedy", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/jump-game-ii/" },
  { name: "Gas Station", dungeon: "Greedy", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/gas-station/" },
  { name: "Hand of Straights", dungeon: "Greedy", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/hand-of-straights/" },
  { name: "Merge Triplets to Form Target Triplet", dungeon: "Greedy", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/" },
  
  // Intervals
  { name: "Merge Intervals", dungeon: "Intervals", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/merge-intervals/" },
  { name: "Insert Interval", dungeon: "Intervals", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/insert-interval/" },
  { name: "Non-overlapping Intervals", dungeon: "Intervals", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/non-overlapping-intervals/" },
  { name: "Meeting Rooms", dungeon: "Intervals", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/meeting-rooms/" },
  
  // Math & Geometry
  { name: "Rotate Image", dungeon: "Math & Geometry", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/rotate-image/" },
  { name: "Spiral Matrix", dungeon: "Math & Geometry", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/spiral-matrix/" },
  { name: "Set Matrix Zeroes", dungeon: "Math & Geometry", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/set-matrix-zeroes/" },
  { name: "Happy Number", dungeon: "Math & Geometry", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/happy-number/" },
  { name: "Plus One", dungeon: "Math & Geometry", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/plus-one/" },
  
  // Bit Manipulation
  { name: "Single Number", dungeon: "Bit Manipulation", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/single-number/" },
  { name: "Number of 1 Bits", dungeon: "Bit Manipulation", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/number-of-1-bits/" },
  { name: "Counting Bits", dungeon: "Bit Manipulation", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/counting-bits/" },
  { name: "Reverse Bits", dungeon: "Bit Manipulation", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/reverse-bits/" },
  { name: "Missing Number", dungeon: "Bit Manipulation", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/missing-number/" },
  { name: "Sum of Two Integers", dungeon: "Bit Manipulation", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/sum-of-two-integers/" }
];

async function run() {
  console.log("Adding Batch 2 of DSA Quests...");
  for (const q of EXTRA_QUESTIONS) {
    try {
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
    } catch (err) {
      console.error(`\nError: ${err.message}`);
    }
  }
  console.log("\nBatch 2 Complete.");
}

run();
