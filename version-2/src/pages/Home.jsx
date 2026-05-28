import { useState } from "react";

import CountryCard from "../components/CountryCard";

function Home({ countriesData, savedCountries = [] }) {

 // SEARCH INPUT STATE
  const [searchTerm, setSearchTerm] = useState("");

  // REGION FILTER STATE
  const [selectedRegion, setSelectedRegion] = useState("");

  // SORT COUNTRIES ALPHABETICALLY
  // spread operator prevents original array mutation
  const sortedCountries = [...countriesData].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );

  // FILTER COUNTRIES
  const filteredCountries = sortedCountries.filter((country) => {

    // SEARCH FILTER
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // REGION FILTER
    const matchesRegion =
      selectedRegion === "" ||
      country.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });


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

      </section>

      {/* COUNTRIES GRID */}

      <section className="countries-container">
        {filteredCountries.map((country) => (
          <CountryCard
          // Here we have a unique key for each card
            key={country.name.common}
             // this is passing the country data as a prop
            country={{
    ...country,
    isSaved: savedCountries?.some(
      (c) => c.country_name === country.name.common
    ),
  }}
          />
        ))}
      </section>
    </main>
  );
}

export default Home;