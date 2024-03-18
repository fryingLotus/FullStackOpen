import  { useEffect, useState } from "react";
import axios from "axios";
import DisplayFilter from "./components/DisplayFilter";

function App() {
  const countryUrl = "https://restcountries.com/v3.1/all";
  const [searchInput, setSearchInput] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(countryUrl);
        setCountryData(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchCountry = (e) => {
    const searchItem = e.target.value.toLowerCase();
    setSearchInput(searchItem);

    // Filter the countryData based on country names
    const filteredItems = countryData.filter((country) =>
      country.name.common.toLowerCase().includes(searchItem)
    );

    setFilteredCountries(filteredItems);
  };

  return (
    <div>
      <p>Search Country</p>
      <input onChange={handleSearchCountry} />
      <DisplayFilter filteredCountries={filteredCountries} searchInput={searchInput} />
    </div>
  );
}

export default App;
