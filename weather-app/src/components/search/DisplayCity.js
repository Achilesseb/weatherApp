import React, { useCallback, useEffect, useState } from "react";
import { geoApiOptions, GEO_API_URL } from "../../api";

const DisplayCity = ({ onSearchChange, setSearchTerm, searchTerm }) => {
  const [geoLocationData, setGeoLocationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGeoLocationData = useCallback(
    async (inputValue) => {
      try {
        if (inputValue !== "") {
          let data;
          let apiUrl = `${GEO_API_URL}/cities?minPopulation=30000&namePrefix=${inputValue}`;

          data = await fetch(apiUrl, geoApiOptions);

          if (!data || data === "undefined") {
            return;
          }

          if (!data.ok) {
            throw new Error(`${data.status}`);
          }
          const response = await data.json();

          const transformedGeoData = response.data.map(
            ({
              id = 404,
              name = "Your city",
              country = "Your country",
              countryCode = "Your country code",
              latitude = 1.0,
              longitude = 1.0,
            }) => {
              return {
                id: id,
                country: country,
                name: name,
                countryCode: countryCode,
                coordinates: `${latitude} ${longitude}`,
              };
            }
          );
          setGeoLocationData(transformedGeoData);
        }
      } catch (err) {
        console.warn(err);
      }
      onSearchChange(geoLocationData);
    },
    [onSearchChange, geoLocationData]
  );

  useEffect(() => {
    let debounceTime;

    if (
      !searchTerm &&
      !setSearchTerm &&
      !fetchGeoLocationData &&
      !onSearchChange
    ) {
      return;
    } else {
      setIsLoading(true);
      debounceTime = setTimeout(() => {
        fetchGeoLocationData(searchTerm.toLowerCase().trim());
        setIsLoading(false);
      }, 600);
    }

    return () => {
      clearTimeout(debounceTime);
    };
  }, [
    searchTerm,
    fetchGeoLocationData,
    setSearchTerm,
    onSearchChange,
    geoLocationData,
  ]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        geoLocationData
          .filter((city) => {
            const citySearchTerm = searchTerm.toLowerCase();
            const citySearchName = city.name.toLowerCase();
            return (
              citySearchName.includes(citySearchTerm) ||
              citySearchName.startsWith(citySearchTerm) ||
              citySearchName.includes("ș".toLowerCase()) ||
              citySearchName.includes("ț".toLowerCase())
            );
          })
          .map((city) => {
            return (
              <p key={city.id}>
                {`${city.name}, ${city.country} ${city.countryCode}`}
              </p>
            );
          })
      )}
    </div>
  );
};

export default DisplayCity;
