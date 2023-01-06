import React, { useEffect, useState, useCallback, useRef } from "react";
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
        `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
        geoApiOptions
      );

      if (!data.ok) {
        throw new Error("Something is not working!");
      }

      const response = await data.json();

      const transformedGeoData = response.data.map((city) => {
        return {
          id: city.id,
          country: city.country,
          countryCode: city.countryCode,
          lat: city.latitude,
          lon: city.longitude,
        };
      });
      console.log(transformedGeoData);
      setGeoLocationData(transformedGeoData);
    } catch (err) {
      console.log(err.message);
    }
  });

  useEffect(() => {
    fetchGeoLocationData(debounceSearch);
  }, [fetchGeoLocationData]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    fetchGeoLocationData(debounceSearch);
  };

  return (
    <div>
      <label htmlFor="search__input">Search City </label>
      <input
        id="search__input"
        type="text"
        placeholder="Search for your city"
        onChange={handleSearch}
        value={searchTerm}
      />
      <p>
        {debounceSearch}
        {console.log(debounceSearch)}
      </p>
      {geoLocationData.map((item) => {
        {
          console.log(item);
        }
        <p style={{ color: "white" }}>
          {item.country} {item.countryCode}
        </p>;
      })}
    </div>
  );
};

export default SearchCity;
