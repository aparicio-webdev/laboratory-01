import * as readlineSync from 'readline-sync';
import * as fs from 'fs';

export const debtsFile: string = 'src/debts.txt';

function readDebt(): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(debtsFile, { encoding: 'utf-8', flag: 'r' }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

async function appendDebt(): Promise<void> {
    try {
        for (;;) {
            const input = readlineSync.question("Who are you and what is your debt? ");

            if (input === 'stop') break;
            if (!input.includes(' ')) {
                console.log("Invalid format.");
                throw new Error("Invalid format");
            }

            const [_name, debtAsString] = input.split(' ');
            const debt = Number(debtAsString);

            if (!isNaN(debt)) {
                await fs.promises.writeFile(debtsFile, input + '\n', { flag: "a+" });
            } else {
                console.log("Not a number!");
                throw new Error("Not a number");
            }
        }
    } catch (error) {
        console.log("An error occurred!", error);
        throw error;
    }
}


async function listDebt() {
    try {
        await appendDebt();
        const result = await readDebt();
        console.log(result);
    } catch (error) {
        console.log("An error occurred!", error);
    }
}

listDebt();