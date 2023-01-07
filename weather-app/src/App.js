import './App.css';
import SearchCity from './components/search/SearchCity';

const App = () => {
  const handleSearchData = (searchData) => {
    // const splitCoodinates = searchData.coodinates.split('');
    // console.log(splitCoodinates);
  };

  return (
    <div className="App">
      <SearchCity onSearchChange={handleSearchData} />
    </div>
  );
};

export default App;
