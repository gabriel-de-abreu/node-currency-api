// USD, CAD
//http://data.fixer.io/api/latest?access_key=286046f9d2c9c57b0a2ad5e68127caa6&format=1
//https://restcountries.eu/rest/v2/currency/cad
const axios = require('axios');

// const getExchangeRate = (from,to) =>{
//     return axios.get("http://data.fixer.io/api/latest?access_key=286046f9d2c9c57b0a2ad5e68127caa6")
//     .then(response =>{
//       const euro = 1/response.data.rates[from];
//       const rate = euro * response.data.rates[to];
//       return rate;
//     });
// };  

// getExchangeRate('USD', 'CAD').then(rate =>{
//     console.log(rate);
// });

const getExchangeRate = async (from,to) =>{
    const response = await axios.get("http://data.fixer.io/api/latest?access_key=286046f9d2c9c57b0a2ad5e68127caa6");
    const euro = 1/response.data.rates[from];
    const rate = euro * response.data.rates[to];
    return rate;
};  

// const getCountries = (currencyCode)=>{
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then(response=>{
//         return response.data.map(country=>country.name);
//     });
// };
const getCountries = async (currencyCode)=>{
   var response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
   return response.data.map(country=>country.name);
};

const convertCurrency = async (from,to,amount) =>{
    const exchangeRate = await getExchangeRate(from,to);
    const countries = await getCountries(to);
    const convertedAmount = (amount * exchangeRate).toFixed(2);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries:
    ${countries.join(',')}`;
};

convertCurrency('BRL','USD',100).then(response=>console.log(response))
.catch((error)=>console.log('Unable to find currency'));