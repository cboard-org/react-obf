import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from './Grid';

const chunks = function(array, size) {
  const newArray = [...array];
  var results = [];

  while (newArray.length) {
    results.push(newArray.splice(0, size));
  }
  return results;
};

export class GridManager extends Component {
  static propTypes = {
    items: PropTypes.array
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const itemsPerPage = nextProps.rows * nextProps.columns;
    const pageCount = Math.ceil(nextProps.items / itemsPerPage);

    if (pageCount !== prevState.pages.length) {
      const pages = chunks(nextProps.items, itemsPerPage);
      return { pages };
    }
    return null;
  }

  state = {
    pages: []
  };

  render() {
    return this.state.pages.map((items, index) => {
      return <Grid {...this.props} key={index} items={items} />;
    });
  }
}

export default GridManager;
