import { useParams } from "react-router-dom";

function CountryDetail({ countriesData }) {

  const { countryCode } = useParams();

  const country = countriesData.find(
    (item) => item.cca3 === countryCode
  );

  // For Loading 
  if (!country) {
    return <h1>Loading...</h1>;
  }

  return (

    <main className="country-detail-page">

      <div className="detail-container">

        {/* FLAG (LEFT SIDE) */}
        <img
          className="detail-flag"
          src={country.flags.png}
          alt={country.name.common}
        />

        {/* TEXT (RIGHT SIDE) */}
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

        </div>

      </div>

    </main>
  );
}

export default CountryDetail;