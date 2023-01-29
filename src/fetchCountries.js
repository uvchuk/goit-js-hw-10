const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FILTER = '?fields=name,capital,population,flags,languages';
export default class CountriesInfoApi {
  constructor() {
    this.searchQuery = '';
  }
  fetchCountries() {
    const url = `${BASE_URL}${this.searchQuery}${FILTER}`;
    return fetch(url)
      .then(result => result.json())
      .then(countries => {
        return countries;
      });
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
