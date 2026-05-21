import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CountryDetail({ countriesData }) {

  const { countryCode } = useParams();

  // State for storing view count
  const [viewCount, setViewCount] = useState(0);

  // Find country by matching URL code
  const country = countriesData.find(
    (item) => item.cca3 === countryCode
  );

  
  // SAVE COUNTRY FUNCTION
  

  async function saveCountry() {

    try {

      const response = await fetch(
        "/api/save-one-country",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            country_name: country.name.common,
          }),
        }
      );

      const data = await response.text();

      console.log(data);

      alert("Country saved!");

    } catch (error) {

      console.log("Error saving country:", error);
    }
  }

  // UPDATE COUNTRY VIEW COUNT
 

  async function updateCountryCount() {

    try {

      const response = await fetch(
        "/api/update-one-country-count",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            country_name: country.name.common,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      // Store updated count in state
      setViewCount(data.count);

    } catch (error) {

      console.log("Error updating country count:", error);
    }
  }


  // useEffect

  // Runs when country loads
  useEffect(() => {

    if (country) {

      updateCountryCount();
    }

  }, [country]);

  
  // LOADING STATE
  

  if (!country) {
    return <h1>Loading...</h1>;
  }

  return (

    <main className="country-detail-page">

      <div className="detail-container">

        {/* FLAG */}

        <img
          className="detail-flag"
          src={country.flags.png}
          alt={country.name.common}
        />

        {/* TEXT */}

        <div className="detail-content">

          <h1>{country.name.common}</h1>

          <p>
            <strong>Population:</strong>{" "}
            {country.population.toLocaleString()}
          </p>

          <p>
            <strong>Region:</strong>{" "}
            {country.region}
          </p>

          <p>
            <strong>Capital:</strong>{" "}
            {country.capital?.[0] || "N/A"}
          </p>

          <p>
            <strong>Country Code:</strong>{" "}
            {country.cca3}
          </p>

          {/* VIEW COUNT */}

          <p>
            <strong>Views:</strong>{" "}
            {viewCount}
          </p>

          {/* SAVE BUTTON */}

          <button className="save-country-btn" onClick={saveCountry}>
          Save Country
          </button>

        </div>

      </div>

    </main>
  );
}

export default CountryDetail;