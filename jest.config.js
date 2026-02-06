module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },
  projects: [
    {
      displayName: 'backend',
      testMatch: ['<rootDir>/apps/backend/**/*.test.ts'],
    },
    {
      displayName: 'worker',
      testMatch: ['<rootDir>/apps/worker/**/*.test.ts'],
    },
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ]
};