"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debtsFile = void 0;
const readlineSync = __importStar(require("readline-sync"));
const fs = __importStar(require("fs"));
exports.debtsFile = 'src/debts.txt';
function callAfterWrite(err, result) {
    if (err) {
        console.log("An error occured during writing", err);
    }
    else {
        console.log(result);
    }
}
function appendDebt(callback) {
    for (;;) {
        const input = readlineSync.question("Who are you and what is your debt? ");
        if (input === 'stop')
            break;
        if (!input.includes(' ')) {
            console.log("Invalid format.");
            continue;
        }
        const [_name, debtAsString] = input.split(' ');
        const debt = Number(debtAsString);
        if (!isNaN(debt)) {
            fs.writeFile(exports.debtsFile, input + '\n', { flag: "a+" }, (err) => {
                if (err) {
                    console.log("An error occured during writing", err);
                }
            });
        }
        else {
            console.log("Not a number!");
        }
    }
    fs.readFile(exports.debtsFile, { encoding: 'utf-8', flag: "r" }, callAfterWrite);
}
function displayDebt(data) {
    console.log(data);
}
appendDebt(displayDebt);
