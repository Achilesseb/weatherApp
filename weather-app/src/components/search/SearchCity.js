import { useState } from "react";
import DisplayCity from "./DisplayCity";

const SearchCity = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    let searchValue = e.target.value;
    setSearchTerm(searchValue);
  };

  const handleSearchData = (searchData) => {
    console.log(searchData);
    const coordinates = searchData.map((city) => {
      const [lan, lon] = city.coordinates.split(" ");
      return console.log(lan, lon);
    });
  };

  return (
    <div className="search_city">
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
      <DisplayCity
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchChange={handleSearchData}
      />
    </div>
  );
};

export default SearchCity;
