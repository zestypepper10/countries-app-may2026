import { useEffect, useState } from "react";
import { useParams, 
  useNavigate, 
} from "react-router-dom";

function CountryDetail({ countriesData }) {

  const { countryCode } = useParams();

 // NAVIGATION HOOK (this hook is utilized for the back button)
  const navigate = useNavigate();

  // State for storing view count
  const [viewCount, setViewCount] = useState(0);

  // Find country by matching URL parameter (cca3 code)
  const country = countriesData.find(
    (item) => item.name === countryCode
  );

  console.log(countryCode); 

  
  // SAVE COUNTRY FUNCTION
  //Sends selected country to backend to be stored as "saved"

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
            country_name: country.name,
          }),
        }
      );

      const data = await response.text();

      console.log(data);

      //alert("Country saved!");

    } catch (error) {

      console.log("Error saving country:", error);
    }
  }

  // UPDATE COUNTRY VIEW COUNT
 
  //This establishes an asynchronous function named updateCountryCount
    // Sends request to backend to increment and return updated view count
// Purpose: this function is responsible for updating a country's view count.
async function updateCountryCount() {

  // Start of a try block.
  // Code inside here will run normally unless an error occurs, at which point the "catch" part - the part responsible for registering an error will register the error and an error message will appear in the console log.
  // Purpose: To create an asynchronous function that can handle API requests and wait for responses before continuing execution to ensure optimal results.
  try {

        // Create a variable named "response".
        // The purpose of "response" is to store the result returned
        // "await" pauses execution until the fetch request is completed, this is to ensure that the API responce is actually delivered, if there is relevant data in the API. Otherwise the catch will lead to the error message if no API data is available.
        // fetch() sends an HTTP request to the API. Specifically, it sends a POST request to the API endpoint
      // Purpose: Create a variable that stores the server's response after sending a request to the API endpoint.
        const response = await fetch(

      // This is the API endpoint being called.
      // Purpose: Specify the backend API route responsible for updating a single country's count.

      "/api/update-one-country-count",
      {

        // This specifies the HTTP method as POST
        // Purpose: Tell the server this request is sending data that should create or update information.
        method: "POST",

        // Sets request headers
        // Headers provide extra information about the request.
       // Purpose: Define additional information about the request.
        headers: {

          // Purpose: Tell the server the request body contains JSON data. 
          "Content-Type": "application/json",
        },
         
        // The body contains the actual data being sent.
        // JSON.stringify converts a JS object into a JSON string at wich point it becomes readable text.
        // Purpose: Send the selected country's name to the backend in JSON format.
        body: JSON.stringify({

          // Sends the selected country's common name as a KEY being sent to the backend.
          // Purpose: To store the selected country's common name under the KEY "country_name".
          country_name: country.name,
        }),
      }
    );

    // "await" pauses until the JSON conversion finishes.
   // Purpose: Converts the server response into a readable JSON daata so JS can access the returned values
    const data = await response.json();

    // Prints the returned data object into the browser console.
    // Purpose: To display the returned server data in the console for debugging and testing purposes.
    console.log(data);

      // Store updated count in state more specifically: 
      // Update the React state variable "viewCount".
    // data.count comes from the backend response.
    // This causes the UI to re-render with the new count.
    // Purpose: To update the React state with the newest view count returned from the backend/database.
      setViewCount(data.count);
    

    // Catch block runs if any error happens in the try block.
     // Purpose: To catch and handle any errors that occur during the API request process.
    } catch (error) {

    // Print a custom error message plus the actual error object.
    // Purpose: To display an error message in the console to help debug failed requests and etc.
      console.log("Error updating country count:", error);
    }
  }


  // useEffect

  // Runs when country data is available/loads
  useEffect(() => {

    if (country) {

      updateCountryCount();
    }

  }, [country]);

  
  // LOADING STATE (while the country is being located)
  

  if (!country) {
    return <h1>Loading...</h1>;
  }

 // FALLBACK FLAG FUNCTION
   // If PNG fails to load, fallback to SVG version
  function handleFlagError(event) {

    // If PNG fails, switch to SVG (this is the vital part)
    if (event.target.src !== country.flags.svg) {

      event.target.src = country.flags.svg;

    }
  }

  return (

    <main className="country-detail-page">

     {/* BACK BUTTON */}

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>


      <div className="detail-container">

        {/* COUNTRY FLAG */}

        <img
          className="detail-flag"
          src={country.flags.png}
          alt={country.name}
          onError={handleFlagError}
        />

        {/* COUNTRY INFO */}

        <div className="detail-content">

          <h1>{country.name}</h1>

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