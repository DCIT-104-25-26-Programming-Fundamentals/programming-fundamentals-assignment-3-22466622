// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 5
// =============================================================================
//
// TASK: Fibonacci Sequence Generator
//
// The Fibonacci sequence is a series of numbers where each number is the sum
// of the two numbers before it:
//
//   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
//
// Write a JavaScript program with TWO parts, each implemented as a function.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_05_fibonacci_sequence.js
//
// -----------------------------------------------------------------------------
// PART A — Print the First N Terms
// -----------------------------------------------------------------------------
// - Ask the user how many terms (N) to display.
// - Print the first N numbers of the Fibonacci sequence on one line.
//
// Example:
//   How many terms? 7
//   Fibonacci sequence: 0 1 1 2 3 5 8
//
// -----------------------------------------------------------------------------
// PART B — Check if a Number Belongs to the Sequence
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Determine whether that number is a Fibonacci number.
// - Print an appropriate message.
//
// Example:
//   Enter a number to check: 13
//   13 is a Fibonacci number.
//
//   Enter a number to check: 20
//   20 is NOT a Fibonacci number.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use a loop (not recursion) to generate the sequence in both parts.
// - N must be a positive integer. If it is not, print an error message.
// - Each part must be implemented in its own function (see scaffold below).
//

//
// =============================================================================
// 'use strict';

// assignment_05_fibonacci_sequence.js
// Part A: Print the first N terms of the Fibonacci sequence.
// Part B: Check whether a given number is a Fibonacci number.
//
// HOW TO RUN:
// 1. npm install readline-sync
// 2. node assignment_05_fibonacci_sequence.js

const readlineSync = require('readline-sync');

function printFirstNTerms() {
  const n = readlineSync.questionInt('How many terms? ');
  if (n <= 0) {
    console.log('Error: N must be a positive integer.');
    return;
  }

  const terms = [];
  // generate using a loop (no recursion)
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      terms.push(0);
    } else if (i === 1) {
      terms.push(1);
    } else {
      // sum of two previous
      terms.push(terms[i - 1] + terms[i - 2]);
    }
  }

  console.log('Fibonacci sequence: ' + terms.join(' '));
}

function isFibonacciNumber(x) {
  if (x < 0) return false; // only non-negative Fibonacci numbers considered
  if (x === 0) return true;
  if (x === 1) return true;

  let a = 0;
  let b = 1;
  while (b < x) {
    const next = a + b;
    a = b;
    b = next;
  }
  return b === x;
}

function checkNumberInSequence() {
  const num = readlineSync.questionInt('Enter a number to check: ');
  if (isFibonacciNumber(num)) {
    console.log(`${num} is a Fibonacci number.`);
  } else {
    console.log(`${num} is NOT a Fibonacci number.`);
  }
}

function main() {
  // Part A
  printFirstNTerms();
  // Part B
  checkNumberInSequence();
}

if (require.main === module) {
  main();
}
// =============================================================================


