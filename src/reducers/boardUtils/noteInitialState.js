const noteInitialState = (scale = 1.0) => ({
  id: null,
  boardId: null,
  x: 0.0,
  y: 0.0,
  z: 0.0,
  color: '#fff',
  content: '',
  viewDimensions: {
    width: 200 * scale,
    height: 200 * scale,
    top: 0,
    left: 0,
  },
  isDraggable: true,
});

export default noteInitialState;
