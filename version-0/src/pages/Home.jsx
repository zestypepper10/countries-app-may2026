import CountryCard from "../components/CountryCard";

function Home({ countriesData }) {
  return (
    // Here main element holds the base content of the home page on which the crads will be displayed.

    <main className="home-page">
      <section className="countries-container">
        {countriesData.map((country) => (
          <CountryCard
          // Here we have a unique key for each card
            key={country.name.common}
             // this is passing the country data as a prop
            country={country}
          />
        ))}
      </section>
    </main>
  );
}

export default Home;