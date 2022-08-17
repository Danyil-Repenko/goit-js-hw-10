import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from "lodash.debounce";
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('input#search-box'),
    countryList: document.querySelector('ul.country-list'),
    countryInfo: document.querySelector('div.country-info'),
}

refs.input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
    const inputValue = event.target.value.trim();

    if (!inputValue) {
        console.log('порожньо');
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return;
    }

    fetchCountries(inputValue)
        .then(data => {
            showCountreis(data);
        })
        .catch(error => {
            refs.countryList.innerHTML = '';
            refs.countryInfo.innerHTML = '';
            Notify.failure("Oops, there is no country with that name");
        });
}

function showCountreis(data) {
    if (data.length === 1) {
        console.log(data);
        refs.countryList.innerHTML = '';
    } else if (data.length >= 2 && data.length <= 10) {
        const markup = data
            .map((country) => {
                return `
          <li class="country-list_item">
            <div class="country-list_flag">
            <img class="image-item" src="${country.flags.svg}" alt="flag of ${country.name.official}">
            </div>
            <p class="country-list_name">${country.name.official}</p>
          </li>
      `;
            })
            .join("");
        refs.countryList.innerHTML = markup;
    } else {
        Notify.info('Too many matches found. Please enter a more specific name.')
    }
}