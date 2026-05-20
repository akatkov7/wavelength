import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import React from 'react';
import Gauge from '../Gauge';
import { initialState, reducer } from './reducer';

// #region Styles

const columnFlexDirection: React.CSSProperties['flexDirection'] = 'column';
const containerStyle: React.CSSProperties = {
  margin: '1rem',
  display: 'flex',
  flexDirection: columnFlexDirection,
  alignItems: 'center',
};

const sliderStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '671px',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '24px',
};

const scoreBoardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '671px',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  marginTop: '36px',
};

const scoreCardStyle: React.CSSProperties = {
  minWidth: '120px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
};

const scoreResetButtonStyle: React.CSSProperties = {
  marginTop: '10px',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
enum GRID_AREA {
  ZERO_WORD = 'zero-word',
  HUNDRED_WORD = 'hundred-word',
  SLIDER = 'slider',
}

// #endregion Styles

const Wavelength = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <main style={containerStyle}>
      <Typography variant="h2">Actual: {state.targetVisible ? state.targetPercent : '???'}</Typography>
      <Gauge
        targetDegree={(state.targetPercent * 180) / 100}
        targetVisible={state.targetVisible}
        pointerDegree={(state.pointerPercent * 180) / 100}
      />

      <section style={sliderStyle}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2" style={{ textAlign: 'left' }}>
            {state.zeroWord}
          </Typography>
          <Typography variant="subtitle2" style={{ textAlign: 'right' }}>
            {state.hundredWord}
          </Typography>
        </div>
        <Slider
          style={{ gridArea: GRID_AREA.SLIDER, alignSelf: 'end' }}
          valueLabelDisplay="off"
          value={state.pointerPercent}
          onChange={(event, value) => dispatch({ type: 'SET_POINTER', pointerPercent: value as number })}
        />
      </section>

      <ButtonGroup>
        <Button onClick={() => dispatch({ type: 'RESET_GAUGE', targetPercent: Math.round(Math.random() * 100) })}>
          RESET
        </Button>
        <Button
          onMouseDown={() => dispatch({ type: 'PEAK_TARGET', isMouseEvent: true })}
          onMouseUp={() => dispatch({ type: 'HIDE_TARGET' })}
          onTouchStart={() => dispatch({ type: 'PEAK_TARGET', isMouseEvent: false })}
          onTouchEnd={() => dispatch({ type: 'HIDE_TARGET' })}
        >
          PEEK
        </Button>
        <Button onClick={() => dispatch({ type: 'SHOW_TARGET' })}>REVEAL</Button>
      </ButtonGroup>

      <section style={scoreBoardStyle} aria-label="Team scores">
        <div style={scoreCardStyle}>
          <Typography variant="subtitle2">Team 1</Typography>
          <Typography variant="h4">{state.leftScore}</Typography>
          <ButtonGroup size="small" aria-label="Team 1 score controls">
            <Button
              aria-label="Decrease Team 1 score"
              onClick={() => dispatch({ type: 'CHANGE_SCORE', side: 'left', delta: -1 })}
            >
              -
            </Button>
            <Button
              aria-label="Increase Team 1 score"
              onClick={() => dispatch({ type: 'CHANGE_SCORE', side: 'left', delta: 1 })}
            >
              +
            </Button>
          </ButtonGroup>
          <Button
            size="small"
            style={scoreResetButtonStyle}
            aria-label="Reset Team 1 score"
            onClick={() => dispatch({ type: 'RESET_SCORE', side: 'left' })}
          >
            RESET
          </Button>
        </div>

        <div style={scoreCardStyle}>
          <Typography variant="subtitle2">Team 2</Typography>
          <Typography variant="h4">{state.rightScore}</Typography>
          <ButtonGroup size="small" aria-label="Team 2 score controls">
            <Button
              aria-label="Decrease Team 2 score"
              onClick={() => dispatch({ type: 'CHANGE_SCORE', side: 'right', delta: -1 })}
            >
              -
            </Button>
            <Button
              aria-label="Increase Team 2 score"
              onClick={() => dispatch({ type: 'CHANGE_SCORE', side: 'right', delta: 1 })}
            >
              +
            </Button>
          </ButtonGroup>
          <Button
            size="small"
            style={scoreResetButtonStyle}
            aria-label="Reset Team 2 score"
            onClick={() => dispatch({ type: 'RESET_SCORE', side: 'right' })}
          >
            RESET
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Wavelength;
