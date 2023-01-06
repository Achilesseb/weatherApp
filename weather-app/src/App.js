import "./App.css";
import SearchCity from "./components/search/SearchCity";

const App = () => {
  const handleSearchData = (searchData) => {
    console.log("Search Data", searchData);
  };

  return (
    <div className="App">
      <SearchCity onSearchChange={handleSearchData} />
    </div>
  );
};

export default App;
