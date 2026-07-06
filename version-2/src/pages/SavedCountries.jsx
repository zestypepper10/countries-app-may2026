import { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";

function SavedCountries({ countriesData }) {

  // State for storing all form input values (to look like figma example)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country_name: "",
    bio: "",
  });

  // State for latest user retrieved from backend
  const [newestUser, setNewestUser] = useState(null);

  // State for saved countries retrieved from backend
  const [savedCountries, setSavedCountries] = useState([]);

  // TO HANDLE INPUT CHANGES

  // This form function dynamically updates form state whenever the user types into an input, select, or textarea field.
  function handleChange(event) {

    const { name, value } = event.target;

    setFormData((previousData) => {
      return {
        ...previousData,
        [name]: value,
      };
    });
  }

  
  // STORE FORM DATA

  // Sends user profile to backend 
  async function handleSubmit(event) {

    // Prevents page refresh
    event.preventDefault();
    
   //---------------// POST //---------------//



    // START OF TRY BLOCK
     // Here try-await-catch method is used to safely handle errors if the POST request fails
    try {

        // POST REQUEST TO BACKEND API
        // This sends new user form data to the server
        const response = await fetch("/api/add-one-user", { //from pseudocode
        
            // HTTP method POST = sending data to backend
        method: "POST",

        headers: {
          "Content-Type": "application/json",       // Tells backend we are sending JSON data

        },

        // Convert JS object into JSON string before sending
        body: JSON.stringify(formData),
      });
      
      // Convert backend response into readable text
      const data = await response.text();
      
      // Log response from server for debugging
      console.log("User saved:", data);

      // Show success message to user in browser
      alert("Profile saved successfully!");

      // After saving, update newest user state
     // Refresh newest user data after successful save
      getNewestUser();


      // CATCH BLOCK
  // Runs only if something goes wrong in the try block
    } catch (error) {

        // Log error message for debugging
      console.log("Error saving user:", error);
    }
  }

    //---------------// GET //---------------//

  // RETRIEVE NEWEST USER

   // Fetches latest user from backend 
  async function getNewestUser() {

    //regular try-await-catch API call

    try {

      const response = await fetch(
        "/api/get-newest-user",
        {
        method: "GET", // HTTP method used to retrieve data (GET = read data) in this case Newest User
      }
      );

      const data = await response.json();

      console.log("Newest user:", data);

      // API returns array with ONE object
      setNewestUser(data[0]);

    } catch (error) {

      console.log("Error fetching newest user:", error);
    }
  }


  //---------------// GET //---------------//
  // RETRIEVE SAVED COUNTRIES
  // GET 
  // Fetches saved countries list
  // This function is asynchronous because it needs to wait for data from the server (we are using the try-await API fetch method)
async function getSavedCountries() {

  // We use try...catch to handle errors safely if the API request fails
  try {

    // Send a GET request to the backend API endpoint (from instructions for version 2)
    // This fetch call asks the server on which API is located for all saved countries
    const response = await fetch(
      "/api/get-all-saved-countries", // API endpoint 
      {
        method: "GET", // HTTP method used to retrieve data (GET = read data) in this case Saved Countries
      }
    );

    // Convert the server response into usable JSON format
    const data = await response.json();

    // Log the retrieved saved countries data to the console for debugging
    console.log("Saved countries:", data);

    // Store the retrieved saved countries in React STATE
    // This updates the UI so the saved countries appear on the page
    setSavedCountries(data);

  } catch (error) {

    // If anything goes wrong (network error, broken API, server error, etc.)
    // This prevents the app from crashing and logs the error instead
    console.log("Error fetching saved countries:", error);
  }
}

     //---------------// POST //---------------//


     //this POST request will be to remove ONE country from the backend


  // useEffect function
  // useEffect HOOK
// Loads backend data on mount
// Runs ONCE when the component first loads (because dependency array is empty)
useEffect(() => {
    
      // Fetch newest user data from backend API
    getNewestUser();


    // Fetch saved countries data from backend API
    getSavedCountries();

  }, []); // Empty dependency array means this only runs ONCE when the page loads


  return (

      // Main container for the Saved Countries page
    <main className="saved-page">

       {/* Page title */}
      <h1>Saved Countries</h1>

      {/* Welcome message */}
      {newestUser && (
        <h2>
          Welcome, {newestUser.name}!
        </h2>
      )}

      {/* 
          PROFILE FORM
       */}

      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >

        {/* NAME INPUT */}

        <label>
          Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* EMAIL INPUT */}

        <label>
          Email
        </label>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* FAVORITE COUNTRY */}

        <label>
          Favorite Country
        </label>

        <select
          name="country_name"
          value={formData.country_name}
          onChange={handleChange}
          required
        >

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

        {/* BIO */}

        <label>
          Bio
        </label>

        <textarea
          name="bio"
          placeholder="Tell us about yourself"
          value={formData.bio}
          onChange={handleChange}
        />

        <button type="submit">
          Save Profile
        </button>

      </form>

      {/* 
          SAVED COUNTRIES SECTION
      */}

      <section className="saved-countries-section">

        <h2>Your Saved Countries</h2>

        <section className="countries-container">

  {[...savedCountries]

  .sort((a, b) =>
    a.country_name.localeCompare(b.country_name)
  )

  .map((savedCountry) => {

    // Find matching full country object from countriesData
    const matchingCountry = countriesData.find(
      (country) =>
        country.name.common === savedCountry.country_name
    );

    // If country does not exist, skip rendering
    if (!matchingCountry) {
      return null;
    }

 // UNSAVE COUNTRY FUNCTION
      async function unsaveCountry(countryName) {

        try {

          const response = await fetch(
            "/api/delete-one-country",
            {
              method: "DELETE",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                country_name: countryName,
              }),
            }
          );

          const data = await response.text();

          console.log(data);

          // UPDATE UI IMMEDIATELY
          setSavedCountries((previousCountries) =>
            previousCountries.filter(
              (savedCountry) =>
           savedCountry.country_name !== countryName
            )
          );

          // REFRESH SAVED COUNTRIES

        } catch (error) {

          console.log("Error unsaving country:", error);
        }
      }

    // Render full reusable country card
    return (
      <CountryCard
        key={matchingCountry.cca3}
        country={{
          ...matchingCountry,
          isSaved: true
        } }

          // SHOW UNSAVE BUTTON
          showUnsaveButton={true}

          // PASS FUNCTION
          onUnsave={unsaveCountry}

      />
    );
  })}

</section>

      </section>

    </main>
  );
}

export default SavedCountries;  