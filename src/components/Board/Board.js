import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Bar from '../Bar/Bar';
import Grid from '../Grid/Grid';
import Output from '../Output/Output';
import './Board.css';

class Board extends Component {
  static propTypes = {
    board: PropTypes.shape({
      /**
       * ID
       */
      id: PropTypes.string,
      /**
       * Locale
       */
      locale: PropTypes.string,
      /**
       * Name
       */
      name: PropTypes.string,
      /**
       * Buttons
       */
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
          }),
          hidden: PropTypes.bool
        })
      ),
      /**
       * Images
       */
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
      /**
       * Sounds
       */
      sounds: PropTypes.arrayOf(PropTypes.shape({})),
      /**
       * Grid
       */
      grid: PropTypes.shape({
        /**
         * Number of rows
         */
        rows: PropTypes.number,
        /**
         * Number of columns
         */
        columns: PropTypes.number,
        /**
         * Buttons order
         */
        order: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
      })
    })
  };

  render() {
    const {
      board,
      navbarEnd,
      navbarStart,
      output,
      onOutputBackspaceRequested,
      onOutputClearRequested,
      renderButton
    } = this.props;

    const { grid } = board;

    return (
      <div className="Board">
        <div className="Board__output">
          <Output
            onBackspaceClick={onOutputBackspaceRequested}
            onClearClick={onOutputClearRequested}
            symbols={output}
          />
        </div>

        <div className="Board__main">
          <div className="Board__navbar">
            <Bar groupStart={navbarStart} groupMiddle={board.name} groupEnd={navbarEnd} />
          </div>
          <div className="Board__grid">
            <Grid
              columns={grid.columns}
              items={board.buttons}
              order={grid.order}
              renderItem={renderButton}
              rows={grid.rows}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
