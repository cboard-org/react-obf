/**
 * Create an empty grid from rows and columns
 *
 * @param {number} rows number of rows
 * @param {number} columns number of columns
 */
function createEmptyGrid(rows, columns) {
  const grid = [...Array(rows)].map(() => [...Array(columns)]);
  return grid;
}

function fillEmptyCells(grid, items) {
  const itemQueue = [...items];

  return grid.map(row =>
    row.map(item => {
      return item || itemQueue.shift();
    })
  );
}

function iterateGridItems(grid, callback) {
  grid.forEach((row, rowIndex) => {
    row.forEach((item, columnIndex) => {
      callback(item, rowIndex, columnIndex);
    });
  });
}

function sortGrid(emptyGrid, order, items) {
  const grid = [...emptyGrid];
  const itemsToSort = [...items];

  iterateGridItems(order, (id, row, column) => {
    const itemIndex = itemsToSort.findIndex(item => item.id === id);
    const itemExists = itemIndex > -1;

    if (itemExists) {
      const item = itemsToSort.splice(itemIndex, 1)[0];
      grid[row][column] = item;
    }
  });

  return fillEmptyCells(grid, itemsToSort);
}

export { createEmptyGrid, sortGrid };
