import './css/styles.css';
import CountriesInfoApi from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const countriesApi = new CountriesInfoApi();
const DEBOUNCE_DELAY = 300;
const refs = {
  inputRef: document.getElementById('search-box'),
  countryListRef: document.querySelector('.country-list'),
  countryInfoRef: document.querySelector('.country-info'),
};

refs.inputRef.addEventListener(
  'input',
  debounce(onCountryNameInput, DEBOUNCE_DELAY)
);

function onCountryNameInput(evt) {
  countriesApi.query = evt.target.value.trim();
  if (countriesApi.query === '') {
    clearInterface();
    return;
  }
  countriesApi.fetchCountries().then(onFindedCountries).catch(onError);
}

function onFindedCountries(countries) {
  clearInterface();
  if (countries.length >= 10)
    Notify.info('Too many matches found. Please enter a more specific name.');
  else if (countries.length < 10 && countries.length > 1)
    showCountriesList(countries);
  else if (countries.length === 1) showCountryInfo(countries[0]);
  else onError('Oops, there is no country with that name');
}

function showCountriesList(countries) {
  const markup = countries
    .map(
      ({ flags, name }) =>
        `<li style="list-style: none; display: flex; align-items: center"><img src="${flags.svg}" width="30", height="20"></img><p style="line-height: 0; margin-left: 10px;">${name.official}</p></li>`
    )
    .join('');
  refs.countryListRef.insertAdjacentHTML('beforeend', markup);
}

function showCountryInfo({ flags, name, capital, population, languages }) {
  const markup = `<img src="${
    flags.svg
  }" width="30", height="20"></img><h2 style="display: inline; margin-left: 10px">${
    name.official
  }</h2><p><strong>Capital: </strong>${capital}</p><p><strong>Population: </strong>${population}</p><p><strong>Languages: </strong>${Object.values(
    languages
  )}</p>`;
  refs.countryInfoRef.insertAdjacentHTML('beforeend', markup);
}

function clearInterface() {
  refs.countryListRef.innerHTML = '';
  refs.countryInfoRef.innerHTML = '';
}

function onError(err) {
  Notify.failure(err);
}
