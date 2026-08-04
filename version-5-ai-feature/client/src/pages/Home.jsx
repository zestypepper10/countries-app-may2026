import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CountryCard from "../components/CountryCard";

function Home({ countriesData, savedCountries = [] }) {

  // NAVIGATION HOOK (used for the random country button)
  const navigate = useNavigate();

 // SEARCH INPUT STATE
  const [searchTerm, setSearchTerm] = useState("");

  // REGION FILTER STATE
  const [selectedRegion, setSelectedRegion] = useState("");

  // SORT COUNTRIES ALPHABETICALLY
  // spread operator prevents original array mutation
  const sortedCountries = [...countriesData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // FILTER COUNTRIES
  const filteredCountries = sortedCountries.filter((country) => {

    // SEARCH FILTER
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // REGION FILTER
    const matchesRegion =
      selectedRegion === "" ||
      country.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  // RANDOM COUNTRY BUTTON HANDLER
  // Picks one random country from the already-loaded countries data
  // and navigates the user to that country's detail page.
  function handleRandomCountry() {

    if (countriesData.length === 0) return;

    const randomIndex = Math.floor(
      Math.random() * countriesData.length
    );

    const randomCountry = countriesData[randomIndex];

    navigate(`/country/${randomCountry.name}`);
  }


  return (
    // Here main element holds the base content of the home page on which the crads will be displayed.

    <main className="home-page">


      {/* SEARCH + FILTER SECTION */}

      <section className="filters-container">

        {/* SEARCH INPUT */}

        <input
          type="text"
          className="search-input"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />

        {/* REGION FILTER */}

        <select
          className="region-filter"
          value={selectedRegion}
          onChange={(event) =>
            setSelectedRegion(event.target.value)
          }
        >

          <option value="">
            Filter by Region
          </option>

          <option value="Africa">
            Africa
          </option>

          <option value="Americas">
            Americas
          </option>

          <option value="Asia">
            Asia
          </option>

          <option value="Europe">
            Europe
          </option>

          <option value="Oceania">
            Oceania
          </option>

        </select>

        {/* RANDOM COUNTRY BUTTON */}

        <button
          type="button"
          className="random-country-btn"
          onClick={handleRandomCountry}
        >
          Random Country
        </button>

      </section>

      {/* COUNTRIES GRID */}

      <section className="countries-container">
        {filteredCountries.map((country) => (
          <CountryCard
          // Here we have a unique key for each card
            key={country.name}
             // this is passing the country data as a prop
            country={{
    ...country,
    isSaved: savedCountries?.some(
      (c) => c.country_name === country.name
    ),
  }}
          />
        ))}
      </section>
    </main>
  );
}

export default Home;