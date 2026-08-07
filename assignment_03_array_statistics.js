// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 3
// =============================================================================
//
// TASK: Array Statistics Calculator
//
// Write a JavaScript program that reads a collection of numbers from the user
// and computes key statistical values using separate functions.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_03_array_statistics.js
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT / OUTPUT EXAMPLE
// -----------------------------------------------------------------------------
//
//   How many numbers? 5
//   Enter number 1: 4
//   Enter number 2: 7
//   Enter number 3: 2
//   Enter number 4: 9
//   Enter number 5: 1
//
//   Results:
//   Sum:     23
//   Average: 4.6
//   Maximum: 9
//   Minimum: 1
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - You MUST implement each calculation in its own function (see scaffold).
// - You may NOT use JavaScript's built-in array methods like reduce(),
//   Math.max(), or Math.min(). Implement the logic yourself using loops.
// - N must be a positive integer. If the user enters 0 or a negative number,
//   print an error message and stop.
//
// =============================================================================
// 'use strict';

// assignment_02_student_grade_system.js
// Reads a student's score (0-100) and prints the corresponding letter grade.
//
// HOW TO RUN:
// 1. npm install readline-sync
// 2. node assignment_02_student_grade_system.js

const readlineSync = require('readline-sync');

function getGrade(score) {
  // Validate range 0-100. Return null if out of range.
  if (score < 0 || score > 100) return null;

  // Determine grade using if / else if / else
  if (score >= 80) {
    return 'A';
  } else if (score >= 70) {
    return 'B';
  } else if (score >= 60) {
    return 'C';
  } else if (score >= 50) {
    return 'D';
  } else {
    return 'F';
  }
}

function main() {
  const score = readlineSync.questionInt('Enter student score (0-100): ');
  const grade = getGrade(score);

  if (grade === null) {
    console.log('Error: Score must be between 0 and 100.');
  } else {
    console.log(`Grade: ${grade}`);
  }
}

if (require.main === module) {
  main();
}
// =============================================================================


