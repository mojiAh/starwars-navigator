import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { test, expect, vi } from "vitest";
import PlanetDetails from "../PlanetDetails";

vi.mock("../../api/swapi", async () => {
    return {
        getPlanetById: vi.fn().mockResolvedValue({
            name: "Tatooine",
            population: "200000",
            climate: "arid",
            films: ["https://swapi.dev/api/films/1/"],
            residents: ["https://swapi.dev/api/people/1/"]
        }),
        fetchJson: vi.fn((url: string) => {
            if (url.endsWith("/films/1/")) {
                return Promise.resolve({ title: "A New Hope" });
            }
            if (url.endsWith("/people/1/")) {
                return Promise.resolve({ name: "Luke Skywalker" });
            }
            return Promise.reject(new Error("unmocked url " + url));
        })
    };
});

test("renders planet details with residents", async () => {
    render(
        <MemoryRouter initialEntries={["/planets/1"]}>
            <Routes>
                <Route path="/planets/:id" element={<PlanetDetails />} />
            </Routes>
        </MemoryRouter>
    );

    // planet details
    expect(await screen.findByText(/Tatooine/i)).toBeInTheDocument();
    expect(await screen.findByText(/200000/i)).toBeInTheDocument();
    expect(await screen.findByText(/arid/i)).toBeInTheDocument();

    // film
    expect(await screen.findByText(/A New Hope/i)).toBeInTheDocument();

    // resident
    const lukeLink = await screen.findByRole("link", { name: /Luke Skywalker/i });
    expect(lukeLink).toHaveAttribute("href", "/characters/1");
});