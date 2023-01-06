import React, { useEffect, useState, useCallback } from "react";
import { geoApiOptions, GEO_API_URL } from "../../api";

const SearchCity = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const [geoLocationData, setGeoLocationData] = useState([]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebounceSearch(searchTerm.toLowerCase().trim());
    }, 600);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm]);

  const fetchGeoLocationData = useCallback(async (inputValue) => {
    try {
      const data = await fetch(
        `${GEO_API_URL}/cities?minPopulation=30000&namePrefix=${inputValue}`,
        geoApiOptions
      );

      if (!data.ok) {
        throw new Error("Something is not working!");
      }
      const response = await data.json();

      const transformedGeoData = response.data.map(
        ({
          id,
          name = "Cluj",
          country = "Romania",
          countryCode = "RO",
          latitude = 1.0,
          longitude = 1.0,
        }) => {
          return {
            id: id,
            country: country,
            name: name,
            countryCode: countryCode,
            lat: latitude,
            lon: longitude,
          };
        }
      );
      setGeoLocationData(transformedGeoData);
    } catch (err) {
      console.error(err);
    }
  });

  useEffect(() => {
    fetchGeoLocationData(debounceSearch);
  }, [fetchGeoLocationData]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    fetchGeoLocationData(debounceSearch);
    onSearchChange(geoLocationData);
  };

  return (
    <React.Fragment>
      <div>
        <label htmlFor="search__input">Search City </label>
        <input
          id="search__input"
          type="text"
          placeholder="Search for your city"
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>
      <div>
        {geoLocationData
          .filter((city) => {
            const citySearchTerm = debounceSearch.toLowerCase();
            const citySearchName = city.name;
            return citySearchName.startsWith(citySearchTerm.toLowerCase());
          })
          .map((city) => {
            <p>{`${city.name}, ${city.country}, ${city.countryCode}`}</p>;
          })}
      </div>
    </React.Fragment>
  );
};

export default SearchCity;
