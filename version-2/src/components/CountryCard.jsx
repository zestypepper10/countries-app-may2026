
import { Link } from "react-router-dom";
function CountryCard({ country,
  showUnsaveButton = false,
  onUnsave,
 }) {


// FALLBACK FLAG FUNCTION
  // Some countries like Afghanistan occasionally fail to load one flag format.
  // This fallback first tries PNG and if it fails it switches to SVG.
  function handleFlagError(event) {

    // If PNG fails, try SVG
    if (event.target.src !== country.flags.svg) {

      event.target.src = country.flags.svg;

    }
  }


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
          onError={handleFlagError}
        />

        <div className="card-content">

          <h2 className="country-name">
  {country.name.common}

  {/* Saved and HEART ICON IF SAVED */}
  {country.isSaved && <span className="heart"> Saved ❤️</span>}
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
            {country.capital?.[0] || "N/A"}
          </p>

 {/* UNSAVE BUTTON */}

          {showUnsaveButton && (

            <button

              className="save-country-btn"

              onClick={(event) => {

                // PREVENT LINK NAVIGATION
                event.preventDefault();

                onUnsave(country.name.common);
              }}
            >
              Unsave Country
            </button>

          )}

        </div>
      </article>

    </Link>
  );
}

export default CountryCard;