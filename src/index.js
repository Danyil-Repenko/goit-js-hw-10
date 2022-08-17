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
    fetchCountries(event.target.value)
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
};


