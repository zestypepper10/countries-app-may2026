function SavedCountries({ countriesData }) {

  function handleSubmit(event) {

    event.preventDefault();

    alert("Form submitted!");
  }

  return (

    <main className="saved-page">

      <h1>Saved Countries</h1>

      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >

        <label>
          Name
        </label>

        <input
          type="text"
          placeholder="Enter your name"
          required
        />

        <label>
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          required
        />

        <label>
          Favorite Country
        </label>

        <select required>

          <option value="">
            Select a country
          </option>

          {countriesData.map((country) => (
            <option
              key={country.cca3}
              value={country.name.common}
            >
              {country.name.common}
            </option>
          ))}

        </select>

        <label>
          Bio
        </label>

        <textarea
          placeholder="Tell us about yourself"
        />

        <button type="submit">
          Save Profile
        </button>

      </form>

    </main>
  );
}

export default SavedCountries;