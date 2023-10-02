import * as readlineSync from 'readline-sync';
import * as fs from 'fs';

export const debtsFile: string = 'src/debts.txt';

function readFile(): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(debtsFile, { encoding: 'utf-8', flag: 'r' }, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
}

function appendDebt(): Promise<void> {
    return new Promise((resolve, reject) => {
        for (;;) {
            const input = readlineSync.question("Who are you and what is your debt? ");

            if (input === 'stop') {
                resolve();
                break;
            }
            
            if (!input.includes(' ')) {
                console.log("Invalid format.");
                reject();
                break;
            }

            const [_name, debtAsString] = input.split(' ');
            const debt = Number(debtAsString);

            if (!isNaN(debt)) {
                    fs.writeFile(debtsFile, input + '\n', {flag: "a+" }, (err) => {
                        if (err) {
                            console.log("Error writing file!");
                            reject(err);
                        }
                    })
            } else {
                console.log("Not a number!");
                reject();
                break;
            }
        }
    });
}

function displayDebt(result: string) {
    console.log(result);
}

appendDebt()
    .then(readFile)
    .then(displayDebt)
    .catch((err) => console.log("An error occured!", err));