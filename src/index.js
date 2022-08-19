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
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return;
    }

    fetchCountries(inputValue)
        .then(manageCountries)
        .catch(operateError);
}

function operateError() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    Notify.failure("Oops, there is no country with that name");
}

function manageCountries(data) {
    if (data.length === 1) {
        loadMatch(data);
    } else if (data.length >= 2 && data.length <= 10) {
        loadTheMatches(data);
    } else {
        tooManyMatchesFound();
    }
}

function loadMatch(data) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = matchMarkup(data);
}

function matchMarkup(data) {
    return data
        .map(({ flags, name, capital, population, languages }) => {
            return `
          <div class="country-info_head">
            <div class="country-info_flag">
            <img class="image-item" src="${flags.svg}" alt="flag of ${name.official}">
            </div>
            <p class="country-info_name">${name.official}</p>
          </div>
          <div class="country-info_details">
          <p class="info-text"><b>Capital:</b> ${capital}</p>
          <p class="info-text"><b>Population:</b> ${population}</p>
          <p class="info-text"><b>Languages:</b> ${Object.values(languages).join(", ")}</p >
          </div >
        `;
        })
        .join("");
}

function loadTheMatches(data) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = theMatchesMarkup(data);
}

function theMatchesMarkup(data) {
    return data
        .map(({ flags, name }) => {
            return `
        <li class="country-list_item">
            <div class="country-list_flag">
            <img class="image-item" src="${flags.svg}" alt="flag of ${name.official}">
            </div>
            <p>${name.official}</p>
          </li>
        `;
        })
        .join("");
}

function tooManyMatchesFound() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.')
}