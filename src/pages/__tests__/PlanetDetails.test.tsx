import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { test, expect } from "vitest";
import PlanetDetails from "../PlanetDetails";

test("renders planet details with residents", async () => {
    render(
        <MemoryRouter initialEntries={["/planets/1"]}>
            <Routes>
                <Route path="/planets/:id" element={<PlanetDetails />} />
            </Routes>
        </MemoryRouter>
    );

    expect(await screen.findByText(/Tatooine/i)).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: /Luke Skywalker/i })).toBeInTheDocument();
});