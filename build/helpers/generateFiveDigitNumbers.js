"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFiveDigitNumbers = void 0;
function generateFiveDigitNumbers() {
    return Math.floor(10000 * Math.random() + 90000);
}
exports.generateFiveDigitNumbers = generateFiveDigitNumbers;
