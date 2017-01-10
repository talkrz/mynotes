const noteInitialState = () => ({
  id: null,
  boardId: null,
  x: 0.0,
  y: 0.0,
  z: 0.0,
  width: 0.12,
  height: 0.12,
  color: '#fff',
  content: '',
  viewDimensions: {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  },
  isDraggable: true,
});

export default noteInitialState;
