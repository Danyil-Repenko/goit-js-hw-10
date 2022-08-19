export function fetchCountries(name) {
    const rootUrl = "https://restcountries.com/v3.1/name/";
    return fetch(`${rootUrl}${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
}