import { createDefaultPreset } from "ts-jest";

const tsJestPreset = createDefaultPreset();

/** @type {import("jest").Config} **/
export default {
  ...tsJestPreset,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/__tests__/**/*.test.ts'],

};