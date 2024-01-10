import { useState } from "react";
import PropTypes from "prop-types";

const DisplayFilter = ({ filteredCountries, searchInput }) => {
  const [showCapital, setShowCapital] = useState(false);

  const toggleShowCapital = () => {
    setShowCapital(!showCapital);
  };

  const renderLanguages = (languages) => {
    return Object.keys(languages).map((key) => (
      <p key={key}>
        <li>{languages[key]}</li>
      </p>
    ));
  };

  const renderFlagImage = (flags) => {
    return Object.keys(flags).map((key) => {
      if (key === "png") {
        return <img key={key} src={flags[key]} alt={flags.alt} style={{ maxWidth: "200px" }} />;
      }
      return null;
    });
  };

  const renderFilteredCountries = () => {
    if (searchInput && filteredCountries.length > 0) {
      if (filteredCountries.length > 10) {
        return <li>Be more specific!</li>;
      } else if (filteredCountries.length === 1) {
        const country = filteredCountries[0];
        return (
          <div>
            <h1>{country.name.common}</h1>
            {showCapital && <p>Capital {country.capital}</p>}
            <p>Area {country.area} km</p>
            <h2>Language:</h2>
            <ul>{renderLanguages(country.languages)}</ul>
            <div>{renderFlagImage(country.flags)}</div>
          </div>
        );
      } else {
        return filteredCountries.map((country, index) => (
          <div key={index} className="grid-country">
            <p>{country.name.common}</p>
            <button onClick={toggleShowCapital}>
              {showCapital ? "Hide Capital" : "Show Capital"}
            </button>
            {showCapital && <p>Capital {country.capital}</p>}
          </div>
        ));
      }
    } else {
      return <li>Please enter a country</li>;
    }
  };

  return <div>{renderFilteredCountries()}</div>;
};

DisplayFilter.propTypes = {
  filteredCountries: PropTypes.array.isRequired,
  searchInput: PropTypes.string.isRequired,
};

export default DisplayFilter;
