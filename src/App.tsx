import {ChangeEvent, useEffect, useState} from "react";
import './App.css';
import { PageContainer } from "./layouts";
import { Container, Row } from "./ui";
import SearchInput from "./components/search-input/SearchInput";
import cities from './cities.json';
import CITY from './types/cities';
import CityInfoBox from "./components/city-info-box/CityInfoBox";
import {withCommas} from "./utils";
import strings from "./strings";

function App() {
  const [searchResults, setSearchResults] = useState<CITY[]>([]);
  const [selected, setSelected] = useState<CITY>();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const cArr = cities as CITY[];
    const res = cArr.filter((city) => {
      return e.target.value && city.name.toLowerCase().startsWith(e.target.value.toLowerCase());
    });
    setSearchResults(res.slice(0, 5));
  }
  
  function handleSelect(chosen: CITY) {
    setSelected(chosen);
  }

  function handleTheme(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    if(checked) {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark')
    } else {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, []);

  return (
    <PageContainer className="bg-gray-50 dark:bg-black">
      <Container className="pt-7">
        <Row className="justify-center">
          <SearchInput
            onChange={handleChange}
            onSelect={handleSelect}
            results={searchResults}
          />
        </Row>
        <Row>
          <div className="flex items-center mb-4 cursor-pointer">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
              onChange={handleTheme}
            />
              <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Dark Mode
              </label>
          </div>
        </Row>
        <Row className="flex-col">
          <p className="mt-6 text-xl dark:text-white">
            {strings.pageGuide}
          </p>
          <div className="border-t-2 border-gray-200 my-2"></div>
        </Row>
        <Row>
          <CityInfoBox name="Name" value={selected?.name} />
          <CityInfoBox name="Country" value={selected?.country} />
          <CityInfoBox name="State/Province" value={selected?.admin1} />
          <CityInfoBox name="Population" value={withCommas(selected?.pop)} />
        </Row>
      </Container>
    </PageContainer>
  )
}

export default App
