module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [
    {
      displayName: 'backend',
      testMatch: ['<rootDir>/apps/backend/**/*.test.ts'],
    },
    {
      displayName: 'frontend',
      testMatch: ['<rootDir>/apps/frontend/**/*.test.ts'],
    },
    {
      displayName: 'worker',
      testMatch: ['<rootDir>/apps/worker/**/*.test.ts'],
    },
    {
      displayName: 'packages',
      testMatch: ['<rootDir>/packages/**/*.test.ts'],
    },
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ]
};