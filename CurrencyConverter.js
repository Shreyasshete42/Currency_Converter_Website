const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');
const converterContainer = document.querySelector('.converter-container');

const countries = [
    { Code: "USD", Name: "United State Dollar"},
    { Code: "INR", Name: "Indian Rupee"},
    { Code: "EURO", Name: "European Union"},
    { Code: "GBP", Name: "Pound sterling"},
    { Code: "CHF", Name: "Swiss franc"},
    { Code: "ILS", Name: "Israeli new shekel"},
    { Code: "CAD", Name: "Canadian Dollar"},
    { Code: "AUD", Name: "Australian dollar"},
    { Code: "NZD", Name: "New Zealand Dollar"},
    { Code: "RUB", Name: "Russian Ruble"},
    { Code: "SGD", Name: "Singapore Dollar"},
    { Code: "CNY", Name: "Chinese Yuan"},
    { Code: "JPY", Name: "Japanese yen"},
    { Code: "KRW", Name: "Korean won"},
    { Code: "THB", Name: "Thai baht"},
    { Code: "KWD", Name: "Kuwaiti Dinar"},
    { Code: "AED", Name: "United Arab Emirates Dirham"},
    { Code: "SAR", Name: "Saudi riyal"},
    { Code: "QAR", Name: "Qatari riyal"},
    { Code: "JOD", Name: "Jordanian Dinar"},
    { Code: "TRY", Name: "Turkish lira"},
    { Code: "LKR", Name: "Sri Lankan rupee"},
    { Code: "PKR", Name: "Pakistani rupee"},
    { Code: "NPR", Name: "Nepalese rupee"},
    { Code: "BDT", Name: "Bangladeshi Taka"},
];

countries.forEach(country => {
    const option1 = document.createElement('option');
    option1.value = country.Code;
    option1.textContent = `${country.Code} (${country.Name})`;
    fromCurrencyElement.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = country.Code;
    option2.textContent = `${country.Code} (${country.Name})`;
    toCurrencyElement.appendChild(option2);

    fromCurrencyElement.value = "USD";
    toCurrencyElement.value = "INR";
})

// Function to get exchange rate using API

const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    resultElement.textContent = "Fetching Exchange Rates...";

    try {
        //Fetch Data From API
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const Data = await response.json();

        const conversionRate = Data.rates[toCurrency];
        const conversionAmount = (amount * conversionRate).toFixed(2);

        if (typeof conversionRate === 'undefined') {
            resultElement.textContent = "Exchange rate data is not available for selected country";
            convertedAmountElement = "";
        }
        else{
            convertedAmountElement.value = conversionAmount;
            resultElement.textContent = `${amount} ${fromCurrency} = ${conversionAmount} ${toCurrency}`;
        }
    } 
    catch (error) 
    {
        // converterContainer.innerHTML = `<h2> Error While Fetching Exchange Rate </h2>`;
    }
}

fromAmountElement.addEventListener('input', getExchangeRate);
fromCurrencyElement.addEventListener('change', getExchangeRate);
toCurrencyElement.addEventListener('change', getExchangeRate);
window.addEventListener('load', getExchangeRate);