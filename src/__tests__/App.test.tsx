import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import App from "../App";

test("renders app title", () => {
    render(<App />);
    const planets = screen.getAllByText(/Planets/i);
    expect(planets.length).toBeGreaterThan(1);
});