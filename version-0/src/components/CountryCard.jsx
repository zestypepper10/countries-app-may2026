
import { Link } from "react-router-dom";
function CountryCard({ country }) {
  return (
    //using article here: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article
   //The <article> HTML element represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable (e.g., in syndication). 
   // //Examples include: a forum post, a magazine or newspaper article, or a blog entry, a product card, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.
   <article className="country-card">
      {/* FLAG Display View*/}

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