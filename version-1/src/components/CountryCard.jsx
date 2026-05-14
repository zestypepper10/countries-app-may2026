
import { Link } from "react-router-dom";
function CountryCard({ country }) {
  return (

    <Link
      to={`/country/${country.cca3}`}
      className="card-link"
    >

      <article className="country-card">

        <img
          className="flag-image"
          src={country.flags.png}
          alt={country.name.common}
        />

        <div className="card-content">

          <h2 className="country-name">
            {country.name.common}
          </h2>

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
            {country.capital?.[0]}
          </p>

        </div>
      </article>

    </Link>
  );
}

export default CountryCard;