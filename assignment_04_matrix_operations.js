// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// 'use strict';

// assignment_04_matrix_operations.js
// Performs three matrix operations (Part A: transpose, Part B: add, Part C: multiply).
//
// HOW TO RUN:
// 1. npm install readline-sync
// 2. node assignment_04_matrix_operations.js

const readlineSync = require('readline-sync');

function readMatrix(rows, cols, label = 'matrix') {
  const matrix = [];
  for (let r = 0; r < rows; r++) {
    while (true) {
      const line = readlineSync.question(`Enter row ${r + 1} of ${label}: `).trim();
      if (line === '') {
        console.log('Error: empty row. Please enter numbers separated by spaces.');
        continue;
      }
      const parts = line.split(/\s+/);
      if (parts.length !== cols) {
        console.log(`Error: expected ${cols} values but got ${parts.length}. Try again.`);
        continue;
      }
      const row = [];
      let bad = false;
      for (let i = 0; i < parts.length; i++) {
        const v = Number(parts[i]);
        if (Number.isNaN(v)) {
          console.log(`Error: "${parts[i]}" is not a number. Re-enter the row.`);
          bad = true;
          break;
        }
        row.push(v);
      }
      if (!bad) {
        matrix.push(row);
        break;
      }
    }
  }
  return matrix;
}

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = rows > 0 ? matrix[0].length : 0;
  const result = [];
  for (let c = 0; c < cols; c++) {
    result[c] = [];
    for (let r = 0; r < rows; r++) {
      result[c][r] = matrix[r][c];
    }
  }
  return result;
}

function addMatrices(a, b) {
  const rowsA = a.length;
  const colsA = rowsA > 0 ? a[0].length : 0;
  const rowsB = b.length;
  const colsB = rowsB > 0 ? b[0].length : 0;
  if (rowsA !== rowsB || colsA !== colsB) return null;
  const result = [];
  for (let r = 0; r < rowsA; r++) {
    result[r] = [];
    for (let c = 0; c < colsA; c++) {
      result[r][c] = a[r][c] + b[r][c];
    }
  }
  return result;
}

function multiplyMatrices(a, b) {
  const m = a.length;
  const n = m > 0 ? a[0].length : 0;
  const p = b.length > 0 ? b[0].length : 0;
  if (n !== b.length) return null; // inner dimension mismatch
  // result is m x p
  const result = [];
  for (let i = 0; i < m; i++) {
    result[i] = [];
    for (let j = 0; j < p; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

function formatMatrixLines(matrix) {
  if (matrix.length === 0) return ['[empty]'];
  const rows = matrix.length;
  const cols = matrix[0].length;
  // compute column widths
  const widths = new Array(cols).fill(0);
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const s = String(matrix[r][c]);
      if (s.length > widths[c]) widths[c] = s.length;
    }
  }
  // build lines
  const lines = [];
  for (let r = 0; r < rows; r++) {
    let line = '';
    for (let c = 0; c < cols; c++) {
      const s = String(matrix[r][c]);
      // right-align each column, add one space between columns
      line += s.padStart(widths[c]) + (c === cols - 1 ? '' : ' ');
    }
    lines.push(line);
  }
  return lines;
}

function printMatrix(title, matrix) {
  console.log(title);
  const lines = formatMatrixLines(matrix);
  for (const ln of lines) {
    console.log(ln);
  }
  console.log(''); // blank line after matrix
}

function positiveIntPrompt(promptText) {
  const n = readlineSync.questionInt(promptText);
  if (n <= 0) {
    console.log('Error: must be a positive integer.');
    return null;
  }
  return n;
}

function partA_transpose() {
  console.log('--- Part A: Transpose a Matrix ---');
  const m = positiveIntPrompt('Enter number of rows: ');
  if (m === null) return;
  const n = positiveIntPrompt('Enter number of columns: ');
  if (n === null) return;

  const mat = readMatrix(m, n, 'matrix A');
  printMatrix('Original Matrix:', mat);
  const t = transposeMatrix(mat);
  printMatrix('Transposed Matrix:', t);
}

function partB_add() {
  console.log('--- Part B: Add Two Matrices ---');
  const m = positiveIntPrompt('Enter number of rows: ');
  if (m === null) return;
  const n = positiveIntPrompt('Enter number of columns: ');
  if (n === null) return;

  console.log('Matrix A:');
  const a = readMatrix(m, n, 'matrix A');
  console.log('Matrix B:');
  const b = readMatrix(m, n, 'matrix B');

  const sum = addMatrices(a, b);
  if (sum === null) {
    console.log('Error: matrices must have the same dimensions for addition.');
    return;
  }
  printMatrix('Matrix A:', a);
  printMatrix('Matrix B:', b);
  printMatrix('Sum (A + B):', sum);
}

function partC_multiply() {
  console.log('--- Part C: Multiply Two Matrices ---');
  const m = positiveIntPrompt('Enter number of rows for matrix A: ');
  if (m === null) return;
  const n = positiveIntPrompt('Enter number of columns for matrix A (and rows for B): ');
  if (n === null) return;
  const p = positiveIntPrompt('Enter number of columns for matrix B: ');
  if (p === null) return;

  console.log('Matrix A:');
  const a = readMatrix(m, n, 'matrix A');
  console.log('Matrix B:');
  const b = readMatrix(n, p, 'matrix B');

  const prod = multiplyMatrices(a, b);
  if (prod === null) {
    console.log('Error: number of columns in A must equal number of rows in B.');
    return;
  }
  printMatrix('Matrix A:', a);
  printMatrix('Matrix B:', b);
  printMatrix('Product (A x B):', prod);
}

function main() {
  console.log('Matrix Operations\n');
  // Part A
  partA_transpose();
  // Part B
  partB_add();
  // Part C
  partC_multiply();
  console.log('Done.');
}

if (require.main === module) {
  main();
}
// =============================================================================

const readlineSync = require('readline-sync');

