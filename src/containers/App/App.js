import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import Countries from "../../components/Countries/Countries";
import CountryInfo from "../../components/CountryInfo/CountryInfo";

const BASE_URL = 'https://restcountries.eu/rest/v2/all?fields=name;alpha3Code';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);

  useEffect(() => {
    const getCountries = async () => {
      const countriesResponse = await axios.get(BASE_URL);
      setCountries(countriesResponse.data);
    };

    getCountries().catch(console.error);
  }, [countries]);

  return (
    <div className="App">
      <Countries>
        {countries.map(item => <li
            key={item.alpha3Code}
            className="Country-name"
            onClick={() => setSelectedCountryCode(item.alpha3Code)}
        >
          {item.name}
        </li>)}
      </Countries>
      <CountryInfo code={selectedCountryCode}/>
    </div>
  );
}

export default App;
