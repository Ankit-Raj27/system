const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DSA_ID = "306fec35-203f-817f-9bad-e6c6e6132583";

const DUNGEONS = ['Arrays', 'Two Pointers', 'Sliding Window', 'Stack', 'Binary Search', 'Linked List', 'Trees', 'Tries', 'Backtracking', 'Graphs', 'Advanced Graphs', '1-D DP', '2-D DP', 'Greedy', 'Intervals', 'Math & Geometry', 'Bit Manipulation'];

// Generating a broader set of common questions
const QUESTIONS = [
  // Arrays
  { name: "Best Time to Buy and Sell Stock", dungeon: "Arrays", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { name: "Two Sum", dungeon: "Arrays", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/two-sum/" },
  { name: "Move Zeroes", dungeon: "Arrays", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/move-zeroes/" },
  { name: "Majority Element", dungeon: "Arrays", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/majority-element/" },
  { name: "Rotate Array", dungeon: "Arrays", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/rotate-array/" },
  { name: "Spiral Matrix", dungeon: "Arrays", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/spiral-matrix/" },
  { name: "Merge Sorted Array", dungeon: "Arrays", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/merge-sorted-array/" },
  
  // Two Pointers
  { name: "3Sum", dungeon: "Two Pointers", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/3sum/" },
  { name: "Valid Palindrome", dungeon: "Two Pointers", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/valid-palindrome/" },
  { name: "Container With Most Water", dungeon: "Two Pointers", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/container-with-most-water/" },
  { name: "Remove Duplicates from Sorted Array", dungeon: "Two Pointers", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
  { name: "Backspace String Compare", dungeon: "Two Pointers", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/backspace-string-compare/" },
  
  // Sliding Window
  { name: "Minimum Window Substring", dungeon: "Sliding Window", rank: "S-Rank (Hard)", url: "https://leetcode.com/problems/minimum-window-substring/" },
  { name: "Longest Substring Without Repeating Characters", dungeon: "Sliding Window", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
  { name: "Sliding Window Maximum", dungeon: "Sliding Window", rank: "S-Rank (Hard)", url: "https://leetcode.com/problems/sliding-window-maximum/" },
  { name: "Max Consecutive Ones III", dungeon: "Sliding Window", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/max-consecutive-ones-iii/" },
  
  // Stack
  { name: "Min Stack", dungeon: "Stack", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/min-stack/" },
  { name: "Evaluate Reverse Polish Notation", dungeon: "Stack", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
  { name: "Largest Rectangle in Histogram", dungeon: "Stack", rank: "S-Rank (Hard)", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
  { name: "Daily Temperatures", dungeon: "Stack", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/daily-temperatures/" },
  
  // Binary Search
  { name: "Search in Rotated Sorted Array", dungeon: "Binary Search", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
  { name: "Find Minimum in Rotated Sorted Array", dungeon: "Binary Search", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
  { name: "Koko Eating Bananas", dungeon: "Binary Search", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/koko-eating-bananas/" },
  { name: "Median of Two Sorted Arrays", dungeon: "Binary Search", rank: "S-Rank (Hard)", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
  
  // Trees
  { name: "Binary Tree Level Order Traversal", dungeon: "Trees", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
  { name: "Lowest Common Ancestor of a BST", dungeon: "Trees", rank: "E-Rank (Easy)", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
  { name: "Binary Tree Zigzag Level Order Traversal", dungeon: "Trees", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/" },
  { name: "Construct Binary Tree from Preorder and Inorder Traversal", dungeon: "Trees", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
  { name: "Validate Binary Search Tree", dungeon: "Trees", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/validate-binary-search-tree/" },
  
  // Graphs
  { name: "Clone Graph", dungeon: "Graphs", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/clone-graph/" },
  { name: "Course Schedule II", dungeon: "Graphs", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/course-schedule-ii/" },
  { name: "Network Delay Time", dungeon: "Graphs", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/network-delay-time/" },
  { name: "Word Ladder", dungeon: "Graphs", rank: "S-Rank (Hard)", url: "https://leetcode.com/problems/word-ladder/" },
  
  // 1-D DP
  { name: "House Robber", dungeon: "1-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/house-robber/" },
  { name: "Maximum Product Subarray", dungeon: "1-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/maximum-product-subarray/" },
  { name: "Longest Increasing Subsequence", dungeon: "1-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
  { name: "Coin Change", dungeon: "1-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/coin-change/" },
  
  // 2-D DP
  { name: "Longest Common Subsequence", dungeon: "2-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/longest-common-subsequence/" },
  { name: "Edit Distance", dungeon: "2-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/edit-distance/" },
  { name: "Interleaving String", dungeon: "2-D DP", rank: "C-Rank (Medium)", url: "https://leetcode.com/problems/interleaving-string/" },
  { name: "Burst Balloons", dungeon: "2-D DP", rank: "S-Rank (Hard)", url: "https://leetcode.com/problems/burst-balloons/" }
];

async function run() {
  console.log("Expanding DSA Dungeons...");
  for (const q of QUESTIONS) {
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
  console.log("\nExpansion Complete.");
}

run();
