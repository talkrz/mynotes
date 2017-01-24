import { expect } from 'chai'; // eslint-disable-line
import reducer from './reducer';

describe('Reducers :: app', () => {
  it('Should return proper initial state', () => {
    expect(reducer(undefined, {})).to.be.deep.equal({
      sidemenuOpen: false,
      title: '',
      titleInEditMode: false,
      createBoardInProgress: false,
      deleteBoardInProgress: false,
    });
  });

  it('Should handle SIDEMENU_OPEN', () => {
    const state = {
      sidemenuOpen: false,
      title: '',
    };

    expect(reducer(state, {
      type: 'SIDEMENU_OPEN',
    })).to.be.deep.equal({
      sidemenuOpen: true,
      title: '',
    });
  });

  it('Should handle SIDEMENU_CLOSE', () => {
    const state = {
      sidemenuOpen: true,
      title: '',
    };

    expect(reducer(state, {
      type: 'SIDEMENU_CLOSE',
    })).to.be.deep.equal({
      sidemenuOpen: false,
      title: '',
    });
  });

  it('Should handle SET_TITLE', () => {
    const state = {
      sidemenuOpen: false,
      title: '',
    };

    expect(reducer(state, {
      type: 'SET_TITLE',
      title: 'foo',
    })).to.be.deep.equal({
      sidemenuOpen: false,
      title: 'foo',
    });
  });
});
