import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from './Row/Row';
import Cell from './Cell/Cell';
import './Grid.css';

/**
 * Create an empty grid from rows and columns
 *
 * @param {number} rows number of rows
 * @param {number} columns number of columns
 */
function createGrid(rows, columns) {
  const grid = [...Array(rows)].map(() => [...Array(columns)]);
  return grid;
}

function fillEmptyCells(grid, items) {
  const itemQueue = [...items];

  return grid.map(row =>
    row.map(item => {
      return item ? item : itemQueue.shift();
    })
  );
}

function sortGrid(grid, order, items) {
  const sortedGrid = [...grid];
  const itemQueue = [...items];

  order.forEach((row, rowIndex) =>
    row.forEach((itemId, columnIndex) => {
      const itemIndex = itemQueue.findIndex(item => item.id === itemId);

      if (itemIndex > -1) {
        sortedGrid[rowIndex][columnIndex] = itemQueue.splice(itemIndex, 1)[0];
      }
    })
  );

  return fillEmptyCells(sortedGrid, itemQueue);
}

class Grid extends Component {
  static propTypes = {
    /**
     * Items to render
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    ),
    /**
     * Number of columns
     */
    columns: PropTypes.number,
    /**
     * Gap between cells
     */
    gap: PropTypes.number,
    /**
     * Item order
     */
    order: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    /**
     * Item renderer
     *
     */
    renderItem: PropTypes.func.isRequired,
    /**
     * Number of rows
     */
    rows: PropTypes.number
  };

  static defaultProps = {
    items: [],
    columns: 3,
    gap: 16,
    order: [],
    rows: 3
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { items, columns, order, rows } = nextProps;
    const grid = createGrid(rows, columns);
    const sortedGrid = sortGrid(grid, order, items);
    return { grid: sortedGrid };
  }

  state = {
    grid: []
  };

  shouldComponentUpdate(nextProps) {
    // TODO: optimize when due
    return true;
  }

  render() {
    const { gap, renderItem } = this.props;

    const cellMargin = gap / 2;
    const gridStyle = { '--cell-margin': `${cellMargin}px` };

    return (
      <div className="Grid" style={gridStyle}>
        {this.state.grid.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((item, cellIndex) => <Cell key={cellIndex}>{item && renderItem(item)}</Cell>)}
          </Row>
        ))}
      </div>
    );
  }
}

export default Grid;
