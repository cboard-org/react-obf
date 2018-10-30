import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { createEmptyGrid, sortGrid } from './utils';
import Row from './Row/Row';
import Cell from './Cell/Cell';
import './Grid.css';

const isEmptyArray = array => array.every(value => !value);

class Grid extends Component {
  static propTypes = {
    /**
     * Items to render
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
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
    order: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    ),
    /**
     * Item renderer
     *
     */
    renderItem: PropTypes.func.isRequired,
    /**
     * Number of rows
     */
    rows: PropTypes.number,
    /**
     * Grid size
     */
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  };

  static defaultProps = {
    items: [],
    columns: 3,
    gap: 16,
    order: [],
    rows: 3,
    rowWrapper: props => props.children
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { items, columns, order, rows } = nextProps;
    const emptyGrid = createEmptyGrid(rows, columns);
    const sortedGrid = sortGrid(emptyGrid, order, items);
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
    const { className, gap, renderItem, rows, rowWrapper: RowWrapper, size } = this.props;

    const space = gap / 2;
    const rowHeight = size.height / rows;

    const gridStyle = {
      '--space-unit': `${space}px`,
      '--row-height': `${rowHeight}px`
    };

    const gridClassName = classNames('Grid', className);

    return (
      <div className={gridClassName} style={gridStyle}>
        {this.state.grid.map((row, rowIndex) => (
          <RowWrapper key={rowIndex} disabled={isEmptyArray(row)}>
            <Row>
              {row.map((item, cellIndex) => (
                <Cell key={cellIndex}>{item && renderItem(item)}</Cell>
              ))}
            </Row>
          </RowWrapper>
        ))}
      </div>
    );
  }
}

export default Grid;
