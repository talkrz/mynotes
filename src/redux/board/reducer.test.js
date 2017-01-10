import { expect } from 'chai'; // eslint-disable-line
import reducer from './reducer';

const createInitialState = () => ({
  id: null,
  notes: [],
  notesMaxZ: 0,
  getInProgres: false,
  saveNoteChangesInProgress: false,
  errorMessage: null,
  viewDimensions: {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  },
  pendingNotesChanges: [],
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
      saveNoteChangesInProgress: false,
      errorMessage: null,
      viewDimensions: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      },
      pendingNotesChanges: [],
    });
  });

  it('Should handle GET_BOARD_SUCCESS', () => {
    const state = {
      id: null,
      notes: [],
      notesMaxZ: 0,
      getInProgres: true,
      saveNoteChangesInProgress: false,
      errorMessage: null,
      viewDimensions: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      },
      pendingNotesChanges: [],
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
    expect(actualState.errorMessage).to.be.null; // eslint-disable-line
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
      errorMessage: 'failed',
    });

    expect(actualState.id).to.equal(null);
    expect(actualState.notesMaxZ).to.equal(0);
    expect(actualState.notes).to.have.lengthOf(0);
    expect(actualState.getInProgres).to.equal(false);
    expect(actualState.errorMessage).to.equal('failed');
  });

  it('Should handle SAVE_NOTES_CHANGES_REQUEST', () => {
    const state = createInitialState();

    const actualState = reducer(state, {
      type: 'SAVE_NOTES_CHANGES_REQUEST',
    });

    expect(actualState.saveNoteChangesInProgress).to.equal(true);
  });

  it('Should handle SAVE_NOTES_CHANGES_SUCCESS', () => {
    const state = createInitialState();
    state.saveNoteChangesInProgress = true;
    state.pendingNotesChanges = [
      { some: 'pending changes' },
    ];

    const actualState = reducer(state, {
      type: 'SAVE_NOTES_CHANGES_SUCCESS',
    });

    expect(actualState.saveNoteChangesInProgress).to.equal(false);
    expect(actualState.errorMessage).to.equal(null);
    expect(actualState.pendingNotesChanges).to.have.lengthOf(0);
  });

  it('Should handle SAVE_NOTES_CHANGES_ERROR', () => {
    const state = createInitialState();
    state.saveNoteChangesInProgress = true;
    state.pendingNotesChanges = [
      { some: 'pending changes' },
    ];

    const actualState = reducer(state, {
      type: 'SAVE_NOTES_CHANGES_ERROR',
      errorMessage: 'failed',
    });

    expect(actualState.saveNoteChangesInProgress).to.equal(false);
    expect(actualState.pendingNotesChanges).to.have.lengthOf(1);
    expect(actualState.errorMessage).to.equal('failed');
  });
});
