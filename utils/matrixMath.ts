

import { MatrixData } from '../types';

export const createMatrix = (rows: number, cols: number, initialValue = 0): MatrixData => {
  return Array(rows).fill(0).map(() => Array(cols).fill(initialValue));
};

export const addMatrices = (a: MatrixData, b: MatrixData): MatrixData | null => {
  if (a.length !== b.length || a[0].length !== b[0].length) return null;
  return a.map((row, i) => row.map((val, j) => val + b[i][j]));
};

export const subtractMatrices = (a: MatrixData, b: MatrixData): MatrixData | null => {
  if (a.length !== b.length || a[0].length !== b[0].length) return null;
  return a.map((row, i) => row.map((val, j) => val - b[i][j]));
};

export const multiplyMatrixByScalar = (a: MatrixData, k: number): MatrixData => {
  return a.map(row => row.map(val => val * k));
};

export const multiplyMatrices = (a: MatrixData, b: MatrixData): MatrixData | null => {
  const r1 = a.length;
  const c1 = a[0].length;
  const r2 = b.length;
  const c2 = b[0].length;

  if (c1 !== r2) return null;

  const result = createMatrix(r1, c2);
  for (let i = 0; i < r1; i++) {
    for (let j = 0; j < c2; j++) {
      let sum = 0;
      for (let k = 0; k < c1; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
};

export const transposeMatrix = (a: MatrixData): MatrixData => {
  return a[0].map((_, colIndex) => a.map(row => row[colIndex]));
};

export const getDeterminant = (m: MatrixData): number | null => {
  if (m.length !== m[0].length) return null;
  const n = m.length;
  if (n === 1) return m[0][0];
  if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];

  // Gaussian elimination (O(N^3))
  const tempM = m.map(row => [...row]); // Copy matrix to avoid side effects
  let det = 1;

  for (let i = 0; i < n; i++) {
    // Pivot
    let pivotIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(tempM[j][i]) > Math.abs(tempM[pivotIdx][i])) {
        pivotIdx = j;
      }
    }

    // Swap rows if needed
    if (pivotIdx !== i) {
      [tempM[i], tempM[pivotIdx]] = [tempM[pivotIdx], tempM[i]];
      det *= -1;
    }

    if (Math.abs(tempM[i][i]) < 1e-10) return 0; // Singular matrix

    det *= tempM[i][i];

    // Elimination
    for (let j = i + 1; j < n; j++) {
      const factor = tempM[j][i] / tempM[i][i];
      for (let k = i; k < n; k++) {
        tempM[j][k] -= factor * tempM[i][k];
      }
    }
  }

  return det;
};

export const getMinor = (m: MatrixData, row: number, col: number): MatrixData => {
  return m
    .filter((_, i) => i !== row)
    .map(r => r.filter((_, j) => j !== col));
};

export const getInverse = (m: MatrixData): MatrixData | null => {
    const det = getDeterminant(m);
    if (det === 0 || det === null) return null;
    
    const n = m.length;
    const adjugate = createMatrix(n, n);

    for(let i=0; i<n; i++) {
        for(let j=0; j<n; j++) {
             const sign = ((i + j) % 2 === 0) ? 1 : -1;
             const minorDet = getDeterminant(getMinor(m, i, j)) || 0;
             // Transpose happens here: adj[j][i] instead of adj[i][j]
             adjugate[j][i] = sign * minorDet; 
        }
    }
    
    return multiplyMatrixByScalar(adjugate, 1/det);
};

export const replaceColumn = (matrix: MatrixData, colIndex: number, columnVector: number[]): MatrixData => {
    return matrix.map((row, i) => {
        const newRow = [...row];
        newRow[colIndex] = columnVector[i];
        return newRow;
    });
};

export const getTrace = (m: MatrixData): number | null => {
  if (m.length !== m[0].length) return null;
  let trace = 0;
  for(let i=0; i<m.length; i++) {
    trace += m[i][i];
  }
  return trace;
};

export const getEigenvalues2x2 = (m: MatrixData): { l1: number, l2: number } | null => {
    if (m.length !== 2 || m[0].length !== 2) return null;
    
    const tr = getTrace(m);
    const det = getDeterminant(m);
    
    if (tr === null || det === null) return null;
    
    const delta = tr * tr - 4 * det;
    if (delta < 0) return null; // Complex roots
    
    const sqrtDelta = Math.sqrt(delta);
    return {
        l1: (tr + sqrtDelta) / 2,
        l2: (tr - sqrtDelta) / 2
    };
};

export const fmt = (n: number) => Math.round(n * 100) / 100;