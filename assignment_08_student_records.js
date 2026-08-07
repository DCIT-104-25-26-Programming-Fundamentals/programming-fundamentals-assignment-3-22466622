// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
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


