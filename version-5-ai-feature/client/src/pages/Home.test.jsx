import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import Home from "./Home";

// Mock useNavigate so we can assert on where the Random Country button sends the user,
// while still using the real MemoryRouter/Link for the country cards.
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const countriesData = [
  {
    name: "Canada",
    population: 38000000,
    region: "Americas",
    capital: ["Ottawa"],
    flags: { png: "canada.png", svg: "canada.svg" },
  },
  {
    name: "Brazil",
    population: 214000000,
    region: "Americas",
    capital: ["Brasilia"],
    flags: { png: "brazil.png", svg: "brazil.svg" },
  },
  {
    name: "Japan",
    population: 125000000,
    region: "Asia",
    capital: ["Tokyo"],
    flags: { png: "japan.png", svg: "japan.svg" },
  },
];

function renderHome(data = countriesData) {
  return render(
    <MemoryRouter>
      <Home countriesData={data} savedCountries={[]} />
    </MemoryRouter>
  );
}

describe("Home - Random Country button", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders a Random Country button", () => {
    renderHome();

    expect(
      screen.getByRole("button", { name: /random country/i })
    ).toBeInTheDocument();
  });

  it("navigates to the detail page of a country from the loaded data", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    renderHome();

    fireEvent.click(
      screen.getByRole("button", { name: /random country/i })
    );

    // Math.random() === 0 -> Math.floor(0 * 3) = index 0 of the countriesData
    // prop (Canada, Brazil, Japan) -> Canada.
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/country/Canada");

    Math.random.mockRestore();
  });

  it("navigates to a different country when Math.random returns a different value", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);

    renderHome();

    fireEvent.click(
      screen.getByRole("button", { name: /random country/i })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/country/Japan");

    Math.random.mockRestore();
  });

  it("does not navigate when there is no country data loaded yet", () => {
    renderHome([]);

    fireEvent.click(
      screen.getByRole("button", { name: /random country/i })
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
