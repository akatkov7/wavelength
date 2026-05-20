import { initialState, reducer } from './reducer';

describe('Wavelength reducer', () => {
  describe('SET_POINTER action', () => {
    it('should set to default initial state with specified target percent', () => {
      const expectedState = { ...initialState, pointerPercent: 43 };

      const actualState = reducer(initialState, { type: 'SET_POINTER', pointerPercent: 43 });

      expect(expectedState).toEqual(actualState);
    });

    it(`shouldn't allow setting the targetPercent state below 0`, () => {
      const expectedState = { ...initialState, pointerPercent: 0 };

      const actualState = reducer(initialState, { type: 'SET_POINTER', pointerPercent: -1 });

      expect(expectedState).toEqual(actualState);
    });

    it(`shouldn't allow setting the targetPercent state above 100`, () => {
      const expectedState = { ...initialState, pointerPercent: 100 };

      const actualState = reducer(initialState, { type: 'SET_POINTER', pointerPercent: 101 });

      expect(expectedState).toEqual(actualState);
    });
  });

  describe('SHOW_TARGET action', () => {
    it('should set targetVisible to true', () => {
      const state = { ...initialState, targetVisible: false };

      const expectedState = { ...state, targetVisible: true };

      const actualState = reducer(state, { type: 'SHOW_TARGET' });

      expect(expectedState).toEqual(actualState);
    });
  });

  describe('PEAK_TARGET action', () => {
    it('should set targetVisible to true', () => {
      const state = { ...initialState, targetVisible: false };

      const expectedState = { ...state, targetVisible: true };

      const actualState = reducer(state, { type: 'PEAK_TARGET', isMouseEvent: false });

      expect(expectedState).toEqual(actualState);
    });
  });

  describe('HIDE_TARGET action', () => {
    it('should set targetVisible to false', () => {
      const state = { ...initialState, targetVisible: true };

      const expectedState = { ...state, targetVisible: false };

      const actualState = reducer(state, { type: 'HIDE_TARGET' });

      expect(expectedState).toEqual(actualState);
    });
  });

  describe('CHANGE_SCORE action', () => {
    it('should update the requested team score', () => {
      const actualState = reducer(initialState, { type: 'CHANGE_SCORE', side: 'left', delta: 1 });

      expect(actualState.leftScore).toBe(1);
      expect(actualState.rightScore).toBe(0);
    });

    it(`shouldn't allow scores below 0`, () => {
      const actualState = reducer(initialState, { type: 'CHANGE_SCORE', side: 'right', delta: -1 });

      expect(actualState.rightScore).toBe(0);
    });
  });

  describe('RESET_SCORE action', () => {
    it('should reset the requested team score', () => {
      const state = {
        ...initialState,
        leftScore: 3,
        rightScore: 2,
      };

      const actualState = reducer(state, { type: 'RESET_SCORE', side: 'left' });

      expect(actualState.leftScore).toBe(0);
      expect(actualState.rightScore).toBe(2);
    });
  });

  describe('RESET_GAUGE action', () => {
    it('should set to default initial state with specified target percent', () => {
      const state = {
        ...initialState,
        targetPercent: 88,
        targetVisible: true,
        pointerPercent: 47,
        leftScore: 3,
        rightScore: 2,
      };

      const actualState = reducer(state, { type: 'RESET_GAUGE', targetPercent: 42 });

      expect(actualState.pointerPercent).toBe(50);
      expect(actualState.targetVisible).toBe(false);
      expect(actualState.targetPercent).toBe(42);
      expect(actualState.leftScore).toBe(3);
      expect(actualState.rightScore).toBe(2);
    });

    it(`shouldn't allow setting the targetPercent state below 0`, () => {
      const actualState = reducer(initialState, { type: 'RESET_GAUGE', targetPercent: -1 });

      expect(actualState.targetPercent).toBe(0);
    });

    it(`shouldn't allow setting the targetPercent state above 100`, () => {
      const actualState = reducer(initialState, { type: 'RESET_GAUGE', targetPercent: 101 });

      expect(actualState.targetPercent).toBe(100);
    });
  });
});
