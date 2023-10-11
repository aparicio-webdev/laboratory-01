import * as readlineSync from 'readline-sync';
import * as fs from 'fs';

export const debtsFile: string = 'src/debts.txt';

function appendDebt(callback: () => void) {
  for (;;) {
    const input = readlineSync.question('Who are you and what is your debt? ');

    if (input === 'stop') break;
    if (!input.includes(' ')) {
      console.log('Invalid format.');
      continue;
    }

    const [_name, debtAsString] = input.split(' ');
    const debt = Number(debtAsString);

    if (!isNaN(debt)) {
      fs.writeFile(debtsFile, input + '\n', { flag: 'a+' }, (err) => {
        if (err) {
          console.log('An error occured during writing', err);
        }
      });
    } else {
      console.log('Not a number!');
    }
  }
  callback();
}

function displayDebt() {
  fs.readFile(debtsFile, { encoding: 'utf-8', flag: 'r' }, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
    }
  });
}

appendDebt(displayDebt);
