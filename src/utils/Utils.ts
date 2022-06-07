import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeToken(Key: string, value: any, dispatch: any) {
  try {
    await AsyncStorage.setItem(Key, JSON.stringify(value));
  } catch (error: any) {
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
      return value;
    } else {
      dispatch({
        type: ErrorType,
        payload: 'Token Not Found May Be',
      });
    }
  } catch (error: any) {
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
    setError('Mobile No must be 8 characters');
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
