import axios from 'axios';
import {Ip_Address} from '../../constants/Data';
import {storeToken} from '../../utils/Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Register_User(Data: any, Firebase_auth_token: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Login_Request',
      });

      const responce = await axios.post(`${Ip_Address}/Register`, Data, {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          Firebase_Auth_Token: Firebase_auth_token,
        },
      });
      await storeToken('Token', responce.data, dispatch);
      dispatch({
        type: 'Login_Sucess',
        payload: responce.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Login_Fail',
        payload: error.message,
      });
    }
  };
}

function Login_User(Msgtoken: any, Token: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Login_Request',
      });
      const Data = {
        Msgtoken,
      };
      console.log('in Login function');
      const responce = await axios.put(`${Ip_Address}/Login`, Data, {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          Firebase_Auth_Token: Token,
        },
      });
      await storeToken('Token', responce.data, dispatch);
      dispatch({
        type: 'Login_Sucess',
        payload: responce.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Login_Fail',
        payload: error.message,
      });
    }
  };
}

function FetchUser(user: any) {
  return async function (dispatch: any) {
    dispatch({
      type: 'FetchUser_Request',
    });
    if (user) {
      try {
        const value = await AsyncStorage.getItem('Token');
        if (value !== null) {
          const Userdata = JSON.parse(value);
          dispatch({
            type: 'FetchUser_Sucess',
            payload: Userdata,
          });
        } else {
          dispatch({
            type: 'FetchUser_Fail',
            payload: 'Login again',
          });
        }
      } catch (error) {
        dispatch({
          type: 'FetchUser_Fail',
          payload: error,
        });
      }
    } else {
      dispatch({
        type: 'FetchUser_Fail',
        payload: 'Login again',
      });
    }
  };
}

function Clear_Auth_Error() {
  return (dispatch: any) => {
    dispatch({
      type: 'Clear_Error',
    });
  };
}

function Clear_Auth_Sucess() {
  return (dispatch: any) => {
    dispatch({
      type: 'Make_Auth_Sucess_Null',
    });
  };
}

export {
  Login_User,
  Clear_Auth_Error,
  Clear_Auth_Sucess,
  Register_User,
  FetchUser,
};
