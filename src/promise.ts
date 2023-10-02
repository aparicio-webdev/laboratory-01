import * as readlineSync from 'readline-sync';
import * as fs from 'fs/promises';
import { debtsFile } from './callback';

function appendDebt(): Promise<void> {
  return new Promise((resolve, reject) => {
    for (;;) {
      const input = readlineSync.question(
        'Who are you and what is your debt? '
      );

      if (input === 'stop') {
        break;
      }

      if (!input.includes(' ')) {
        console.log('Invalid format.');
        reject();
        break;
      }

      const [_name, debtAsString] = input.split(' ');
      const debt = Number(debtAsString);

      if (!isNaN(debt)) {
        fs.writeFile(debtsFile, input + '\n', { flag: 'a+' });
      } else {
        console.log('Not a number!');

        break;
      }
    }
    resolve();
  });
}

appendDebt()
  .then(() => {
    return fs.readFile(debtsFile, { encoding: 'utf-8', flag: 'r' });
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log('An error occured!', err));
