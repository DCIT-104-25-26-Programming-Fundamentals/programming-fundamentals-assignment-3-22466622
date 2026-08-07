// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 6
// =============================================================================
//
// TASK: Multiplication Table Generator
//
// Write a JavaScript program that generates multiplication tables using loops
// and functions.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_06_multiplication_table.js
//
// -----------------------------------------------------------------------------
// PART A — Single Table
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Print the multiplication table for that number from 1 to 12.
//
// Expected output (if user enters 5):
//
//   Multiplication Table for 5:
//   5  x  1  =  5
//   5  x  2  =  10
//   5  x  3  =  15
//   ...
//   5  x  12 =  60
//
// -----------------------------------------------------------------------------
// PART B — Bonus: Tables from 1 to N
// -----------------------------------------------------------------------------
// - Ask the user to enter a number N.
// - Print the full multiplication table for every number from 1 to N.
// - Add a separator line (e.g. "---") between each table.
//
// Expected output (if user enters 3):
//
//   Multiplication Table for 1:
//   1  x  1  =  1
//   ...
//   1  x  12 =  12
//   ---------------------------
//   Multiplication Table for 2:
//   2  x  1  =  2
//   ...
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - N must be a positive integer. If the user enters an invalid value,
//   print an error message and stop.
// - Each part must be in its own function (see scaffold below).
// - Complete Part A before attempting Part B.

//
// =============================================================================
// 'use strict';

// assignment_06_multiplication_table.js
// Part A: Print multiplication table for a single number (1..12).
// Part B: Print multiplication tables for every number from 1 to N.
//
// HOW TO RUN:
// 1. npm install readline-sync
// 2. node assignment_06_multiplication_table.js

const readlineSync = require('readline-sync');

function printSingleTable(num) {
  console.log(`Multiplication Table for ${num}:`);
  for (let i = 1; i <= 12; i++) {
    // Format so columns are reasonably aligned
    const left = String(num).padEnd(2);
    const mid = String(i).padStart(2);
    const prod = String(num * i).padStart(3);
    console.log(`${left}  x  ${mid}  = ${prod}`);
  }
  console.log('');
}

function printTablesUpToN(N) {
  if (N <= 0) {
    console.log('Error: N must be a positive integer.');
    return;
  }
  for (let n = 1; n <= N; n++) {
    printSingleTable(n);
    if (n !== N) {
      console.log('---------------------------');
    }
  }
}

function partA_singleTable() {
  const num = readlineSync.questionInt('Enter a number: ');
  printSingleTable(num);
}

function partB_tablesUpToN() {
  const N = readlineSync.questionInt('Enter N (positive integer): ');
  if (N <= 0) {
    console.log('Error: N must be a positive integer.');
    return;
  }
  printTablesUpToN(N);
}

function main() {
  // Part A
  partA_singleTable();
  // Part B (bonus)
  partB_tablesUpToN();
}

if (require.main === module) {
  main();
}
// =============================================================================


