import * as matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";

expect.extend(matchers);

declare module 'vitest' {
    interface JestAssertion<T = any>
        extends matchers.TestingLibraryMatchers<ReturnType<typeof expect.stringContaining>, T> { }
}