import { expect } from 'chai'; // eslint-disable-line
import reducer from './reducer';

const createInitialState = () => ({
  id: null,
  notes: [],
  notesMaxZ: 0,
  getInProgres: false,
  viewDimensions: {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  },
});

describe('Reducers :: board', () => {
  it('Should return proper initial state', () => {
    const initialState = createInitialState();

    expect(reducer(undefined, {})).to.be.deep.equal(initialState);
  });

  it('Should handle RESET_BOARD', () => {
    const state = {
      whatever: 'it is',
    };

    const newState = createInitialState();

    expect(reducer(state, {
      type: 'RESET_BOARD',
    })).to.deep.equal(newState);
  });

  it('Should handle GET_BOARD_REQUEST', () => {
    const state = createInitialState();

    expect(reducer(state, {
      type: 'GET_BOARD_REQUEST',
    })).to.deep.equal({
      id: null,
      notes: [],
      notesMaxZ: 0,
      getInProgres: true,
      viewDimensions: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      },
    });
  });

  it('Should handle GET_BOARD_SUCCESS', () => {
    const state = {
      id: null,
      notes: [],
      notesMaxZ: 0,
      getInProgres: true,
      viewDimensions: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      },
    };

    const actualState = reducer(state, {
      type: 'GET_BOARD_SUCCESS',
      board: {
        id: 'server board id',
        notes: [{
          id: 'server note id',
          boardId: 'server board id',
          x: 0.5,
          y: 0.2,
          z: 3,
          content: 'Test',
          color: '#abc',
        }],
      },
    });

    expect(actualState.id).to.equal('server board id');
    expect(actualState.notes).to.have.lengthOf(1);
    expect(actualState.notesMaxZ).to.equal(3);
    expect(actualState.getInProgres).to.be.false; // eslint-disable-line
    expect(actualState.viewDimensions).to.deep.equal({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    });

    expect(actualState.notes[0]).to.deep.equal({
      id: 'server note id',
      boardId: 'server board id',
      x: 0.5,
      y: 0.2,
      z: 3,
      width: 0.12,
      height: 0.12,
      color: '#abc',
      content: 'Test',
      viewDimensions: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      },
      isDraggable: true,
    });
  });

  it('Should handle GET_BOARD_ERROR', () => {
    const state = createInitialState();
    state.id = 'id';
    state.notesMaxZ = 345;
    state.notes = [
      { some: 'notes data' },
    ];
    state.getInProgres = true;

    const actualState = reducer(state, {
      type: 'GET_BOARD_ERROR',
    });

    expect(actualState.id).to.equal(null);
    expect(actualState.notesMaxZ).to.equal(0);
    expect(actualState.notes).to.have.lengthOf(0);
    expect(actualState.getInProgres).to.equal(false);
  });

  it('Should handle NOTE_MOVE_TO_THE_TOP', () => {
    const state = createInitialState();
    state.notes.push({
      id: 1,
      boardId: 1,
      x: 0.5,
      y: 0.5,
      z: 5,
      width: 0.12,
      height: 0.12,
      color: '#fff',
      content: '1st note',
      isDraggable: true,
    });

    state.notes.push({
      id: 2,
      boardId: 1,
      x: 0.5,
      y: 0.5,
      z: 2,
      width: 0.12,
      height: 0.12,
      color: '#fff',
      content: '1st note',
      isDraggable: true,
    });

    state.notesMaxZ = 5;

    const newState = reducer(state, {
      type: 'NOTE_MOVE_TO_THE_TOP',
      noteKey: 1,
    });

    expect(newState.notes[0].z).to.equal(5);
    expect(newState.notes[1].z).to.equal(6);
    expect(newState.notesMaxZ).to.equal(6);
  });
});
