import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid/Grid';
import Output from '../Output/Output';

class Board extends Component {
  static propTypes = {
    board: PropTypes.shape({
      id: PropTypes.string,
      locale: PropTypes.string,
      name: PropTypes.string,
      buttons: PropTypes.arrayOf(
        PropTypes.shape({
          action: PropTypes.string,
          id: PropTypes.string,
          label: PropTypes.string,
          vocalization: PropTypes.string,
          image_id: PropTypes.string,
          sound_id: PropTypes.string,
          background_color: PropTypes.string,
          border_color: PropTypes.string,
          load_board: PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string,
            data_url: PropTypes.string
          })
        })
      ),
      images: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number,
          data: PropTypes.string,
          'content-type': PropTypes.string,
          url: PropTypes.string,
          source_url: PropTypes.string,
          author_name: PropTypes.string,
          author_url: PropTypes.string
        })
      ),
      sounds: PropTypes.arrayOf(PropTypes.shape({})),
      grid: PropTypes.shape({
        rows: PropTypes.number,
        columns: PropTypes.number,
        order: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
      })
    })
  };

  render() {
    const { board, renderTile } = this.props;

    return (
      <div className="Board">
        <div className="Board__output">
          <Output />
        </div>

        <div className="Board__main">
          <div className="Board__grid">
            <Grid items={board.buttons} order={board.order} renderItem={renderTile} />
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
