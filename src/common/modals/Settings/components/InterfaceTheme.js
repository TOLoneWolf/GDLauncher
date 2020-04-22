import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
// import { Slider, Button, Input, Switch } from 'antd';
import { SketchPicker } from 'react-color';
// import { openModal } from '../../../reducers/modals/actions';

const DivMain = styled.div`
  width: 100%;
`;

const DivCustom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 40px;
`;

const H1 = styled.h1`
  text-align: left;
  color: ${props => props.theme.palette.text.primary};
  margin: 30px 0 20px 0;
`;

const H3 = styled.h3`
  text-align: left;
  font-size: 15px;
  font-weight: 700;
  color: ${props => props.theme.palette.text.secondary};
`;

const Para = styled.p`
  color: ${props => props.theme.palette.text.third};
  text-align: left;
`;

const Picker = styled(SketchPicker)`
  color: #000;
`;

// const Hr = styled.hr`
//   opacity: 0.29;
//   background: ${props => props.theme.palette.secondary.light};
// `;

export default function MyAccountPreferences() {
  // const javaMemory = useSelector(state => state.settings.java.memory);
  // const dispatch = useDispatch();
  const [color, setColor] = useState('$ff0000');
  const [color2, setColor2] = useState('$ff0000');

  return (
    <DivMain>
      <H1>Example Main Title</H1>
      <H3>
        Example Title&nbsp; <FontAwesomeIcon icon={faList} />
      </H3>
      <div className="color-picker" />
      <DivCustom>
        <Para>Example paragraph.</Para>
      </DivCustom>
      <span>
        <Picker
          color={color}
          onChangeComplete={colorF => setColor(colorF.hex)}
        />
      </span>
      <span>
        <Picker
          color={color2}
          onChangeComplete={colorF => setColor2(colorF.hex)}
        />
      </span>
    </DivMain>
  );
}
