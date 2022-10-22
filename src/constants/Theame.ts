import {Dimensions, PixelRatio} from 'react-native';
const {height, width} = Dimensions.get('window');

export const DPwidth = (widthNumber: any) => {
  let givenwidth =
    typeof widthNumber === 'number' ? widthNumber : parseFloat(widthNumber);
  return PixelRatio.roundToNearestPixel((width * givenwidth) / 100);
};

export const Dpheight = (heightNumber: any) => {
  let givenheight =
    typeof heightNumber === 'number' ? heightNumber : parseFloat(heightNumber);
  return PixelRatio.roundToNearestPixel((height * givenheight) / 100);
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: DPwidth(6.1),

  // font sizes
  h1: Dpheight(3.8),
  h2: Dpheight(2.5),
  h3: Dpheight(2),
  Size4: Dpheight(2.1),
  h5: Dpheight(1.5),

  Size24: Dpheight(3.1),
  body2: Dpheight(2.8),
  body3: Dpheight(2.3),
  body4: Dpheight(1.8),
  body5: Dpheight(1.5),
};

export const COLORS = {
  primary: '#FF6C44',
  transparentPrimray: 'rgba(227, 120, 75, 0.4)',
  orange: '#FFA133',
  lightOrange: '#FFA133',
  lightOrange2: '#FDDED4',
  lightOrange3: '#FFD9AD',
  green: '#27AE60',
  red: '#FF1717',
  blue: '#0064C0',
  darkBlue: '#111A2C',
  darkGray: '#525C67',
  darkGray2: '#757D85',
  gray: '#898B9A',
  gray2: '#BBBDC1',
  gray3: '#CFD0D7',
  lightGray1: '#DDDDDD',
  lightGray2: '#F5F5F8',
  white2: '#FBFBFB',
  white: '#FFFFFF',
  black: '#000000',

  transparent: 'transparent',
  transparentBlack1: 'rgba(0, 0, 0, 0.1)',
  transparentBlack7: 'rgba(0, 0, 0, 0.7)',
};

export const FONTS = {
  h1: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h1},
  h2: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.h2,
  },
  h3: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h3},
  h5: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h5},
  body2: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body2,
  },
  body3: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body3,
  },
  body4: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body4,
  },
  body5: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body5,
  },
};
