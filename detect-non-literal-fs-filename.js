const fs = require('fs');

const userInput = "fake_secret.txt";

const dataUnsafe = fs.readFileSync(userInput, 'utf8');
console.log(`Unsafe way: ${dataUnsafe}`);

const dataSafe = fs.readFileSync(`${__dirname}/${userInput}`, 'utf8');
console.log(`Safe way: ${dataSafe}`);
