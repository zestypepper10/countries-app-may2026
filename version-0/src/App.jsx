import "./App.css";
// Import routing components from react-router-dom
// to create navigation and page routes.
import {
  Routes,
  Route,
  Link,
} from "react-router-dom";

// Import page components used in the app.
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
import CountryDetail from "./pages/CountryDetail";

// Import local country data that will be displayed on the Home page.
import localData from "../localData";

function App() {

  // State to store countries data
  const [countriesData, setCountriesData] = useState([]);
/*
  // Fetch countries from API
  async function fetchCountries() {
    try {

      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders"
      );

      const data = await response.json();

      setCountriesData(data);

    } catch (error) {

      console.log("API failed. Using local data.");

      // Fallback data
      setCountriesData(localData);
    }
  }

  // Run fetch on page load
  useEffect(() => {
    fetchCountries();
  }, []);
*/

// This function is responsible for fetching country data from the REST Countries API
// It runs asynchronously because we are waiting for data from an external server, 
// which is good because it allows for the API to actually come through at a higher rate/probability of actually comming through
async function fetchCountries() {
  try { //try says to try and access the data

    // Here a request is sent to the REST Countries API endpoint
    // This specific URL only requests the fields the app actually needs:
    // name, flags, population, capital, region, cca3, and borders (though we can request other information)
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders"
    );

    // Converts the response into JSON format to use it in JS but be able to be understood by a human reading
    const data = await response.json();

    // Store the fetched country data into React state
    // This will trigger a re-render so the UI updates with the new API data
    setCountriesData(data);

  } catch (error) {

    // If anything goes wrong (API is down, network error, parts of fethch requests are not available, etc.)
    // The error is cought here instead of crashing the app

    console.log("API failed. Using local data.");

    // Fallback option:
    // If the API request fails, this instructs the app to use the localData file instead
    // This ensures the app still works even without internet or with API fetch issues present
    setCountriesData(localData);
  }
}

// Here I used useEffect 
// The empty dependency array [] means this runs ONLY ONCE when the page loads
useEffect(() => {

  // Calls the function to fetch countries as soon as the component mounts/loads
  fetchCountries();
//the empty array
}, []);


  return (
    // Main container for the entire application.
    <div className="app-container">
      
      {/* Header section with navigation links */}

      <header className="header">
        
        {/* Link that takes users back to the home page */}
        <Link
          to="/"
          className="logo-link"
        >
          Where in the world?
        </Link>

        {/* Link that opens the Saved Countries page */}
        <Link
          to="/saved"
          className="saved-link"
        >
          Saved Countries
        </Link>

      </header>

      {/* Routes decide which page component to display
          based on the current URL path */}

      <Routes>
        
        {/* Home page route that passes country data as props */}
        <Route
          path="/"
          element={
            <Home
              countriesData={countriesData}
            />
          }
        />

        {/* Route for the Saved Countries page */}
        <Route
          path="/saved"
          element={
            <SavedCountries
              countriesData={countriesData}
            />
          }
        />

        {/* Dynamic route for displaying details about
            a specific country using the country name */}
        <Route
          path="/country/:countryCode"
          element={
            <CountryDetail
              countriesData={countriesData}
            />
          }
        />

      </Routes>
    </div>
  );
}

export default App;