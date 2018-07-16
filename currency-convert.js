const axios = require('axios');

const getExchangeRate = async (from,to) =>{
    try{
        const response = await axios.get("http://data.fixer.io/api/latest?access_key=286046f9d2c9c57b0a2ad5e68127caa6");
        const euro = 1/response.data.rates[from];
        const rate = euro * response.data.rates[to];
        if(isNaN(rate) || isNaN(euro)){
            throw new Error();
        }
        return rate;
    }
    catch (error){
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
    }
    
};  

const getCountries = async (currencyCode)=>{
    try{
    var response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    }
    catch(error){
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
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
.catch((error)=>console.log(error.message));