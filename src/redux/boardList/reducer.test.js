import { expect } from 'chai';
import boardList from './reducer';

describe('Reducers :: board list', () => {
  it('Should return proper initial state', () => {
    expect(boardList(undefined, {})).to.be.deep.equal({
      boards: [],
      boardsThumbnails: [],
      getInProgres: false,
      errorMessage: null,
    });
  });

  it('Should handle GET_BOARD_LIST_REQUEST', () => {
    const state = {
      boards: [],
      getInProgres: false,
      errorMessage: null,
    };
    expect(boardList(state, {
      type: 'GET_BOARD_LIST_REQUEST',
    })).to.be.deep.equal({
      boards: [],
      getInProgres: true,
      errorMessage: null,
    });
  });

  it('Should handle GET_BOARD_LIST_SUCCESS', () => {
    const state = {
      boards: [],
      boardsThumbnails: [],
      getInProgres: true,
      errorMessage: null,
    };

    const newState = boardList(state, {
      type: 'GET_BOARD_LIST_SUCCESS',
      boards: [
        { some: 'board' },
      ],
    });

    expect(newState).to.be.deep.equal({
      boards: [
        { some: 'board' },
      ],
      boardsThumbnails: [],
      getInProgres: false,
      errorMessage: null,
    });
  });

  it('Should handle GET_BOARD_LIST_ERROR', () => {
    const state = {
      boards: [],
      boardsThumbnails: [],
      getInProgres: true,
      errorMessage: null,
    };

    const newState = boardList(state, {
      type: 'GET_BOARD_LIST_ERROR',
      errorMessage: 'failed',
    });

    expect(newState).to.be.deep.equal({
      boards: [],
      boardsThumbnails: [],
      getInProgres: false,
      errorMessage: 'failed',
    });
  });
});
