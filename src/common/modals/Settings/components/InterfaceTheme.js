import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Select, Slider, Button, Input, Switch } from 'antd';
import { SketchPicker } from 'react-color';
import {
  updateSelectedTheme,
  resetTheme,
  updateTest
} from '../../../reducers/settings/actions';
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

const PickerSpan = styled.span`
  display: inline-block;
  margin: 2px;
`;

const ColorPicker = ({
  title,
  color,
  onChangeComplete,
  wrapClass,
  labelClass,
  pickerClass
}) => (
  <>
    <PickerSpan className={wrapClass}>
      <div className={labelClass}>{title}</div>
      <Picker
        color={color}
        onChangeComplete={onChangeComplete}
        className={pickerClass}
      />
    </PickerSpan>
  </>
);

// const Hr = styled.hr`
//   opacity: 0.29;
//   background: ${props => props.theme.palette.secondary.light};
// `;

/** Themes colors are set here.
 * src/ui/theme.js
 */
export default function MyAccountPreferences() {
  const dispatch = useDispatch();
  const activeTheme = useSelector(state => state.settings.theme.active);
  const themesList = useSelector(state => state.settings.theme.themes);
  const defaultTheme = useSelector(
    state => state.settings.theme.themes.Default
  );
  const primaryColor = useSelector(
    state => state.settings.theme.themes[activeTheme].palette.text.primary
  );
  const secondaryColor = useSelector(
    state => state.settings.theme.themes[activeTheme].palette.text.secondary
  );
  const thirdColor = useSelector(
    state => state.settings.theme.themes[activeTheme].palette.text.third
  );
  const [themeName, setThemeName] = useState('Custom');
  const [color, setColor] = useState(primaryColor);
  const [color2, setColor2] = useState(secondaryColor);
  const [color3, setColor3] = useState(thirdColor);
  // const testObject = {
  //   Default: { color: '#fff' },
  //   White: { color: '#fdd' }
  // };

  // delete testObject.test3;
  // testObject.index.pop(1);
  // testObject.index.pop();

  function sortObjectKeys(inputObject) {
    const sortArray = [];
    Object.keys(inputObject).map(x =>
      x !== 'Default' ? sortArray.push(x) : ''
    );
    return ['Default'].concat(sortArray.sort());
  }

  function testFunct() {
    return sortObjectKeys(themesList).map(x => (
      <Select.Option value={x} key={x}>
        {x}
      </Select.Option>
    ));
  }

  // function returnArray(array) {
  //   const rows = [];
  //   for (const [index, val] of array.entries()) {
  //     rows.push(
  //       <Select.Option value={index} key={index}>
  //         {val}
  //       </Select.Option>
  //     );
  //   }
  //   return rows;
  // }

  return (
    <DivMain>
      <H1>Example Main Title</H1>
      <H3>
        Example Title&nbsp; <FontAwesomeIcon icon={faList} />
      </H3>
      <DivCustom>
        <Para>Example paragraph.</Para>
      </DivCustom>
      <div>
        <Input
          value={themeName}
          onChange={e => {
            setThemeName(e.target.value);
          }}
          maxLength="25"
          css={`
            width: 100px;
          `}
        />

        <Button
          onClick={() =>
            // settings.theme.themes.White.palette.text.primary
            dispatch(
              updateTest({
                name: themeName,
                data: {
                  ...defaultTheme,
                  palette: {
                    ...defaultTheme.palette,
                    text: {
                      ...defaultTheme.palette.text,
                      primary: color,
                      secondary: color2,
                      third: color3
                    }
                  }
                }
              })
            )
          }
        >
          Create Theme
        </Button>
      </div>
      <div>
        <Button onClick={() => dispatch(resetTheme())}>Clear Themes</Button>
        <Select
          defaultValue="Default"
          onChange={v => dispatch(updateSelectedTheme(v))}
          value={activeTheme}
          css={`
            width: 100px;
            text-align: start;
          `}
        >
          {testFunct()}
          {console.log(themesList)}
        </Select>
      </div>
      <ColorPicker
        title="Primary Color"
        color={color}
        onChangeComplete={colorF => setColor(colorF.hex)}
      />
      <ColorPicker
        title="Secondary Color"
        color={color2}
        onChangeComplete={colorF => setColor2(colorF.hex)}
      />
      <ColorPicker
        title="Error Color"
        color={color3}
        onChangeComplete={colorF => setColor3(colorF.hex)}
      />
    </DivMain>
  );
}
