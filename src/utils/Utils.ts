import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BgmiMap,
  CodMMap,
  DefaultMap,
  FreeFireMap,
  PubgMap,
} from '../constants/Data';
import Icons from '../constants/Icons';
import {Dpheight} from '../constants/Theame';

export async function storeToken(Key: string, value: any, dispatch: any) {
  try {
    await AsyncStorage.setItem(Key, JSON.stringify(value));
  } catch (error: any) {
    console.log(error);
    dispatch({
      type: 'Login_Fail',
      payload: error.message,
    });
  }
}

export async function Return_Token(ErrorType: any, dispatch: any) {
  try {
    const value = await AsyncStorage.getItem('Token');
    if (value !== null) {
      const Userdata = JSON.parse(value);
      return Userdata.Auth_Token;
    } else {
      dispatch({
        type: ErrorType,
        payload: 'Token Not Found May Be',
      });
    }
  } catch (error: any) {
    console.log(error);

    dispatch({
      type: ErrorType,
      payload: error.message,
    });
  }
}

function isValidEmail(value: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}

export function validateEmail(value: string, setEmailError: Function) {
  if (value == '') {
    setEmailError('');
  } else if (isValidEmail(value)) {
    setEmailError('');
  } else {
    setEmailError('Invalid Email');
  }
}

export function validateNumber(value: string, setError: Function) {
  if (value.length < 10) {
    setError('Mobile No must be 10 characters');
  } else {
    setError('');
  }
}

export function CalculateLength(
  value: string,
  setNum: Function,
  maxLength: number,
) {
  setNum(maxLength - value.length);
}

export function ReturnGameImage(GameName: string) {
  switch (GameName) {
    case 'FreeFire':
      return Icons.FreeFire;

    case 'BGMI':
      return Icons.BGMI;

    case 'FreeFire Max':
      return Icons.FFMax;

    case 'Pubg Mobile':
      return Icons.Pubg;

    case 'CODM':
      return Icons.COD;

    default:
      break;
  }
}

export function ReturnGameMap(GameName: string) {
  switch (GameName) {
    case 'FreeFire':
      return FreeFireMap;

    case 'BGMI':
      return BgmiMap;

    case 'FreeFire Max':
      return FreeFireMap;

    case 'Pubg Mobile':
      return PubgMap;

    case 'CODM':
      return CodMMap;

    default:
      return DefaultMap;
  }
}

export function ReturnMap_Modal_Height(GameName: string) {
  switch (GameName) {
    case 'FreeFire':
      return Dpheight(43);

    case 'BGMI':
      return Dpheight(43);

    case 'FreeFire Max':
      return Dpheight(43);

    case 'Pubg Mobile':
      return Dpheight(34.5);

    case 'CODM':
      return Dpheight(18);

    default:
      return Dpheight(10);
  }
}
