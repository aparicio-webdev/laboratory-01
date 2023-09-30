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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debtsFile = void 0;
const readlineSync = __importStar(require("readline-sync"));
const fs = __importStar(require("fs"));
exports.debtsFile = 'src/debts.txt';
function readDebt() {
    return new Promise((resolve, reject) => {
        fs.readFile(exports.debtsFile, { encoding: 'utf-8', flag: 'r' }, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
function appendDebt() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (;;) {
                const input = readlineSync.question("Who are you and what is your debt? ");
                if (input === 'stop')
                    break;
                if (!input.includes(' ')) {
                    console.log("Invalid format.");
                    throw new Error("Invalid format");
                }
                const [_name, debtAsString] = input.split(' ');
                const debt = Number(debtAsString);
                if (!isNaN(debt)) {
                    yield fs.promises.writeFile(exports.debtsFile, input + '\n', { flag: "a+" });
                }
                else {
                    console.log("Not a number!");
                    throw new Error("Not a number");
                }
            }
        }
        catch (error) {
            console.log("An error occurred!", error);
            throw error;
        }
    });
}
function listDebt() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield appendDebt();
            const result = yield readDebt();
            console.log(result);
        }
        catch (error) {
            console.log("An error occurred!", error);
        }
    });
}
listDebt();
