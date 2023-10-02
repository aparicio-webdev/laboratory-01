import * as readlineSync from 'readline-sync';
import * as fs from 'fs/promises';

export const debtsFile: string = 'src/debts.txt';

async function readDebt() {
        try {
            const debtList = await fs.readFile(debtsFile, { encoding: 'utf-8', flag: 'r' });
            console.log(debtList);
        }
        catch (err) {
            console.log("Error occured: ", err)
        }
}


async function appendDebt() {
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
                await fs.writeFile(debtsFile, input + '\n', { flag: "a+" });
            } else {
                console.log("Not a number!");
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
        await readDebt();
    } catch (error) {
        console.log("An error occurred: ", error);
    }
}

listDebt();