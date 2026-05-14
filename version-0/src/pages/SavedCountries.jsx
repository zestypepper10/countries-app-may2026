function SavedCountries({ countriesData }) {

  function handleSubmit(event) {

    event.preventDefault();

    alert("Form submitted!");
  }

  return (
        //Main here has/is the space for the primary content of the page.

    <main className="placeholder-page">
      <h1>Saved Countries Page</h1>
    </main>
  );
}

export default SavedCountries;