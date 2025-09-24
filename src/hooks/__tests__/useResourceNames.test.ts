import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useResourceNames } from "../useResourceNames";
import { fetchJson } from "../../api/swapi";

vi.mock("../../api/swapi", () => ({
    fetchJson: vi.fn(),
}));

const mockFetchJson = fetchJson as unknown as ReturnType<typeof vi.fn>;

describe("useResourceNames", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns null when no urls are provided", () => {
        const { result } = renderHook(() => useResourceNames([]));

        expect(result.current.loading).toBe(false);
        expect(result.current.getName("any")).toBeNull();
    });

    it("fetches and caches names for given urls", async () => {
        const urls = ["https://swapi.dev/api/people/1/"];
        mockFetchJson.mockResolvedValueOnce({ name: "Luke Skywalker" });

        const { result } = renderHook(() => useResourceNames(urls));

        // initially loading is true after effect kicks in
        expect(result.current.loading).toBe(true);

        // wait for hook updates
        await act(async () => { });

        expect(result.current.loading).toBe(false);
        expect(result.current.getName(urls[0])).toBe("Luke Skywalker");
        expect(mockFetchJson).toHaveBeenCalledWith(urls[0]);
    });

    it("handles fetchJson failure", async () => {
        const urls = ["https://swapi.dev/api/people/2/"];
        mockFetchJson.mockRejectedValueOnce(new Error("Network error"));

        const { result } = renderHook(() => useResourceNames(urls));

        await act(async () => { });

        expect(result.current.loading).toBe(false);
        expect(result.current.getName(urls[0])).toBe("Unknown");
    });

    it("does not refetch already cached urls", async () => {
        const urls = ["https://swapi.dev/api/people/3/"];
        mockFetchJson.mockResolvedValueOnce({ name: "Leia Organa" });

        const { result, rerender } = renderHook(
            ({ u }) => useResourceNames(u),
            { initialProps: { u: urls } }
        );

        await act(async () => { });

        expect(result.current.getName(urls[0])).toBe("Leia Organa");

        rerender({ u: urls }); // same urls again

        await act(async () => { });

        expect(mockFetchJson).toHaveBeenCalledTimes(1); // no duplicate calls
    });
});
