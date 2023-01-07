import React, { useEffect, useState, useCallback } from 'react';
import { geoApiOptions, GEO_API_URL } from '../../api';

const SearchCity = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceSearch, setDebounceSearch] = useState('');
  const [geoLocationData, setGeoLocationData] = useState([]);

  const fetchGeoLocationData = useCallback(async (inputValue) => {
    const userInputValue = inputValue;
    try {
      const data = await fetch(
        `${GEO_API_URL}/cities?minPopulation=30000&namePrefix=${
          userInputValue ? userInputValue : ' '
        }`,
        geoApiOptions
      );

      if (!data.ok) {
        throw new Error(`${data.status}`);
      }
      const response = await data.json();

      const transformedGeoData = response.data.map(
        ({
          id = 404,
          name = 'Cluj',
          country = 'Romania',
          countryCode = 'RO',
          latitude = 1.0,
          longitude = 1.0,
        }) => {
          return {
            id: id,
            country: country,
            name: name,
            countryCode: countryCode,
            coodinates: `${latitude} ${longitude}`,
          };
        }
      );

      setGeoLocationData(transformedGeoData);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebounceSearch(searchTerm.toLowerCase().trim());
    }, 600);

    fetchGeoLocationData(debounceSearch);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm, debounceSearch, fetchGeoLocationData]);

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
      <p>{debounceSearch}</p>
      <div>
        {geoLocationData
          .filter((city) => {
            const citySearchTerm = debounceSearch.toLowerCase();
            const citySearchName = city.name.toLowerCase();
            return (
              citySearchName.includes(citySearchTerm) &&
              citySearchName.startsWith(citySearchTerm)
            );
          })
          .map((city) => {
            return (
              <p
                key={city.id}
              >{`${city.name}, ${city.country} ${city.countryCode}`}</p>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default SearchCity;
