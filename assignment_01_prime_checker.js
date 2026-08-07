// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 1
// =============================================================================
//
// TASK: Prime Number Checker
//
// Write a JavaScript program that checks whether a given number is prime.
//
// A prime number is a whole number greater than 1 that has no divisors
// other than 1 and itself (e.g., 2, 3, 5, 7, 11, 13 ...).
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_01_prime_checker.js
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT / OUTPUT EXAMPLES
// -----------------------------------------------------------------------------
//
//   Enter a number: 7
//   7 is a prime number.
//
//   Enter a number: 10
//   10 is NOT a prime number.
//
//   Enter a number: 1
//   1 is NOT a prime number.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - You MUST implement the logic inside a function (see scaffold below).
// - Numbers less than 2 are NOT prime — handle this inside the function.
// - The main() function must call isPrime() and print the result.
// - Use readlineSync.questionInt() to read integer input from the user.
//

//
// =============================================================================
// 'use strict';

// assignment_01_prime_checker.js
// Checks whether a given number is prime.
//
// HOW TO RUN:
// 1. npm install readline-sync
// 2. node assignment_01_prime_checker.js

const readlineSync = require('readline-sync');

function isPrime(n) {
  // Handle non-integers defensively (questionInt returns integers).
  if (!Number.isInteger(n)) return false;
  if (n < 2) return false;      // Numbers less than 2 are NOT prime
  if (n === 2) return true;     // 2 is prime
  if (n % 2 === 0) return false; // even numbers > 2 are not prime

  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function main() {
  const num = readlineSync.questionInt('Enter a number: ');
  if (isPrime(num)) {
    console.log(`${num} is a prime number.`);
  } else {
    console.log(`${num} is NOT a prime number.`);
  }
}

if (require.main === module) {
  main();
}
// =============================================================================


