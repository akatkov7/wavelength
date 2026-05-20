import copy from 'copy-to-clipboard';
import antonyms from './resources/antonyms';

export const initialState = {
  targetPercent: 0,
  targetVisible: false,
  pointerPercent: 50,
  leftScore: 0,
  rightScore: 0,
  zeroWord: 'RESET',
  hundredWord: 'RESET',
  antonymIndex: 0,
};

type Actions =
  | { type: 'SET_POINTER'; pointerPercent: number }
  | { type: 'SHOW_TARGET' }
  | { type: 'PEAK_TARGET'; isMouseEvent: boolean }
  | { type: 'HIDE_TARGET' }
  | { type: 'CHANGE_SCORE'; side: 'left' | 'right'; delta: number }
  | { type: 'RESET_SCORE'; side: 'left' | 'right' }
  | { type: 'RESET_GAUGE'; targetPercent: number };

export const reducer = (state: typeof initialState, action: Actions): typeof initialState => {
  switch (action.type) {
    case 'SET_POINTER': {
      return {
        ...state,
        pointerPercent: Math.min(100, Math.max(0, action.pointerPercent)),
      };
    }
    case 'SHOW_TARGET': {
      return { ...state, targetVisible: true };
    }
    case 'PEAK_TARGET': {
      action.isMouseEvent && copy(state.targetPercent.toString());
      return {
        ...state,
        targetVisible: true,
      };
    }
    case 'HIDE_TARGET': {
      return { ...state, targetVisible: false };
    }
    case 'CHANGE_SCORE': {
      const scoreKey = action.side === 'left' ? 'leftScore' : 'rightScore';

      return {
        ...state,
        [scoreKey]: Math.max(0, state[scoreKey] + action.delta),
      };
    }
    case 'RESET_SCORE': {
      const scoreKey = action.side === 'left' ? 'leftScore' : 'rightScore';

      return {
        ...state,
        [scoreKey]: 0,
      };
    }
    case 'RESET_GAUGE': {
      // Copy target value to clip board
      copy(action.targetPercent.toString());

      // Get new antonyms
      const [zeroWord, hundredWord] = antonyms[state.antonymIndex];

      return {
        ...initialState,
        leftScore: state.leftScore,
        rightScore: state.rightScore,
        targetPercent: Math.min(100, Math.max(0, action.targetPercent)),
        zeroWord,
        hundredWord,
        antonymIndex: state.antonymIndex + 1,
      };
    }
    default: {
      return state;
    }
  }
};
