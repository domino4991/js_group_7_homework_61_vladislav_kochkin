import React, {useEffect, useState} from 'react';
import './CountryInfo.css';
import axios from 'axios';

const BASE_URL = 'https://restcountries.eu/rest/v2/alpha/';

const CountryInfo = props => {
    const [countryInfo, setCountryInfo] = useState(null);
    const [countryNames, setCountryNames] = useState([]);

    useEffect(() => {
        if(props.code !== null) {
            const getCountryInfo = async () => {
                const infoResponse = await axios.get(BASE_URL + props.code);
                const countryNames = [];
                infoResponse.data.borders.map( async item => {
                    const itemResponse = await axios.get(BASE_URL + item);
                    countryNames.push(itemResponse.data.name);
                });
                setCountryInfo(infoResponse.data);
                setCountryNames(countryNames);
            }
            getCountryInfo().catch(console.error);
        }
    }, [props.code]);

    return (
        <section className="Country-info">
            {countryInfo ?
                <>
                    <article className="Country-info__article">
                        <h1 className="Country-info__article-title">Информация о стране</h1>
                        <header className="Country-info__header">
                            <h3 className="Country-info__title">{countryInfo.name}</h3>
                            <img src={countryInfo.flag} alt={countryInfo.name} className="Country-info__flag" />
                        </header>
                        <div className="Country-info__body">
                            <p className="Country-info__item">
                                <span>Столица: </span>
                                {countryInfo.capital === '' ? 'Нет столицы' : countryInfo.capital}
                            </p>
                            <p className="Country-info__item">
                                <span>Численность населения: </span>
                                {countryInfo.population}
                            </p>
                            <p className="Country-info__item">
                                <span>Континент: </span> {countryInfo.subregion === '' ? 'Нет информации' : countryInfo.subregion}
                            </p>
                            <p className="Country-info__item">
                                <span>Границы: </span>
                                {countryNames.length !== 0 ? countryNames.join(', ') : 'Нет границ'}
                            </p>
                        </div>
                    </article>
                </>
                : <p>Выберите страну из списка</p>}
        </section>
    );
};

export default CountryInfo;