// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 9
// =============================================================================
//
// TASK: Console-Based Simple Calculator
//
// Build a calculator program that runs in the console and performs basic
// arithmetic operations based on the user's input.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_09_simple_calculator.js
//
// -----------------------------------------------------------------------------
// OPERATIONS YOUR CALCULATOR MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Addition          ( + )    e.g.  10 + 3  =  13
//   2. Subtraction       ( - )    e.g.  10 - 3  =  7
//   3. Multiplication    ( * )    e.g.  10 * 3  =  30
//   4. Division          ( / )    e.g.  10 / 3  =  3.33
//   5. Modulus           ( % )    e.g.  10 % 3  =  1  (remainder)
//   6. Exponentiation    ( ** )   e.g.  2 ** 8  =  256
//   7. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ============================
//        SIMPLE CALCULATOR
//   ============================
//   1. Addition
//   2. Subtraction
//   3. Multiplication
//   4. Division
//   5. Modulus
//   6. Exponentiation
//   7. Quit
//   Select an operation (1-7):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Select an operation (1-7): 4
//   Enter first number : 10
//   Enter second number: 3
//   Result: 10 / 3 = 3.33
//
//   Select an operation (1-7): 4
//   Enter first number : 5
//   Enter second number: 0
//   Error: Cannot divide by zero.
//
//   Select an operation (1-7): 7
//   Goodbye!
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Each arithmetic operation MUST be written as its own function.
// - Use a loop so the calculator keeps running until the user selects Quit.
// - Division by zero must be caught and handled with a clear error message
//   (do NOT let the program crash).
// - Display results to 2 decimal places using .toFixed(2).
// - Handle invalid menu choices gracefully.
//

//
// =============================================================================
// 'use strict';

// assignment_08_student_records.js
// Console-based student records manager.
//
// HOW TO RUN:
// 1. npm install readline-sync
// 2. node assignment_08_student_records.js
//
// FEATURES:
// 1. Add student (name, unique ID, scores[])
// 2. Display all students (Name, ID, Scores, Average)
// 3. Calculate average score for a specific student by ID
// 4. Quit
//
// Notes:
// - Averages are shown to 2 decimal places (.toFixed(2))
// - Uses readline-sync for input; each feature is in its own function

const readlineSync = require('readline-sync');

function showMenu() {
  console.log('================================');
  console.log('   STUDENT RECORD SYSTEM MENU');
  console.log('================================');
  console.log('1. Add student');
  console.log('2. Display all students');
  console.log('3. Calculate average score');
  console.log('4. Quit');
}

function computeAverage(scores) {
  if (!scores || scores.length === 0) return null;
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  return sum / scores.length;
}

function addStudent(students) {
  const name = readlineSync.question('Student name: ').trim();
  if (name === '') {
    console.log('Error: name cannot be empty.');
    return;
  }

  const id = readlineSync.questionInt('Student ID: ');
  // Enforce uniqueness
  const exists = students.find(s => s.id === id);
  if (exists) {
    console.log(`Error: A student with ID ${id} already exists.`);
    return;
  }

  const count = readlineSync.questionInt('How many scores? ');
  if (count < 0) {
    console.log('Error: Number of scores cannot be negative.');
    return;
  }

  const scores = [];
  for (let i = 0; i < count; i++) {
    const prompt = `Enter score ${i + 1}: `;
    const score = readlineSync.questionFloat(prompt);
    scores.push(score);
  }

  const student = { name: name, id: id, scores: scores };
  students.push(student);
  console.log(`Student "${name}" added successfully.`);
}

function displayAllStudents(students) {
  if (students.length === 0) {
    console.log('No students found.');
    return;
  }

  // Prepare nicely aligned table: determine column widths dynamically
  const nameHeader = 'Name';
  const idHeader = 'ID';
  const scoresHeader = 'Scores';
  const avgHeader = 'Average';

  let nameW = nameHeader.length;
  let idW = idHeader.length;
  let scoresW = scoresHeader.length;
  let avgW = avgHeader.length;

  const rows = students.map(s => {
    const scoresStr = s.scores.length > 0 ? s.scores.join(', ') : '(no scores)';
    const avg = computeAverage(s.scores);
    const avgStr = avg === null ? '-' : avg.toFixed(2);
    if (s.name.length > nameW) nameW = s.name.length;
    const idStr = String(s.id);
    if (idStr.length > idW) idW = idStr.length;
    if (scoresStr.length > scoresW) scoresW = scoresStr.length;
    if (avgStr.length > avgW) avgW = avgStr.length;
    return { name: s.name, id: idStr, scoresStr: scoresStr, avgStr: avgStr };
  });

  // Print header
  const header =
    nameHeader.padEnd(nameW) + '  ' +
    idHeader.padEnd(idW) + '  ' +
    scoresHeader.padEnd(scoresW) + '  ' +
    avgHeader.padStart(avgW);
  console.log(header);
  // Separator
  console.log('-'.repeat(nameW) + '  ' + '-'.repeat(idW) + '  ' + '-'.repeat(scoresW) + '  ' + '-'.repeat(avgW));

  // Print rows
  for (const r of rows) {
    const line =
      r.name.padEnd(nameW) + '  ' +
      r.id.padEnd(idW) + '  ' +
      r.scoresStr.padEnd(scoresW) + '  ' +
      r.avgStr.padStart(avgW);
    console.log(line);
  }
}

function calculateAverageForStudent(students) {
  const id = readlineSync.questionInt('Enter student ID: ');
  const student = students.find(s => s.id === id);
  if (!student) {
    console.log(`Error: No student found with ID ${id}.`);
    return;
  }
  const avg = computeAverage(student.scores);
  if (avg === null) {
    console.log(`${student.name} has no scores recorded.`);
  } else {
    console.log(`${student.name}'s average score: ${avg.toFixed(2)}`);
  }
}

function main() {
  const students = [];
  while (true) {
    showMenu();
    const choice = readlineSync.questionInt('Enter your choice (1-4): ');
    console.log(''); // spacing
    switch (choice) {
      case 1:
        addStudent(students);
        break;
      case 2:
        displayAllStudents(students);
        break;
      case 3:
        calculateAverageForStudent(students);
        break;
      case 4:
        console.log('Goodbye!');
        return;
      default:
        console.log('Error: Invalid choice. Please enter a number between 1 and 4.');
    }
    console.log(''); // blank line before re-displaying menu
  }
}

if (require.main === module) {
  main();
}
// =============================================================================


