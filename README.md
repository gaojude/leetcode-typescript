# LeetCode in TypeScript Setup

This is a Node.js setup for LeetCode in TypeScript. This also includes a testing functionality.

- To watch and compile, use `npm run start`.
- To start the testing script, use `npm test`.

## Typical Workflow

- Add your leetcode problem function into `src/main.ts`.
- Make sure that the added function is marked `export` so that the testing script can import it.
- Navigate to `src/test/main.test.ts`, and add the corresponding tests after you import the function.
