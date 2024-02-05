import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bgRedBright('Welcome to Currency Converter:\n'));
let countries = [
    'PKR',
    'USD',
    'UED',
    'INR',
    'AUD',
    'BDT',
    'BHD',
    'CAD',
    'CNY'
];
let exchangeRateApi = "https://v6.exchangerate-api.com/v6/b4cc0b99baf15713ff52d83d/latest/PKR";
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(exchangeRateApi);
let firstCountry = await inquirer.prompt({
    type: 'list',
    name: 'from',
    message: chalk.magentaBright('Converting from:'),
    choices: countries,
});
let secondCountry = await inquirer.prompt({
    type: 'list',
    name: 'to',
    message: chalk.yellow('Converted to:'),
    choices: countries,
});
let convertingMoney = await inquirer.prompt({
    type: 'number',
    name: 'convertingMoney',
    message: chalk.magentaBright(`Enter the amount in ${chalk.green(firstCountry.from)}:`),
});
let conversion = `https://v6.exchangerate-api.com/v6/b4cc0b99baf15713ff52d83d/pair/${firstCountry.from}/${secondCountry.to}`;
let conversionData = async (data) => {
    let cnvRate = await fetch(data);
    let res = await cnvRate.json();
    return res.conversion_rate;
};
let cnvData = await conversionData(conversion);
let convertedData = convertingMoney.convertingMoney * cnvData;
console.log(`${firstCountry.from}: ${chalk.green(convertingMoney.convertingMoney)} is equal to ${secondCountry.to}: ${chalk.green(convertedData.toLocaleString())} `);
