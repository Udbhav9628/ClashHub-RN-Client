import axios from 'axios';
import {Ip_Address} from '../../constants/Data';
import {storeToken} from '../../utils/Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import getAuth from '@react-native-firebase/auth';

function Register_User(Data: any, Firebase_auth_token: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'FetchUser_Request',
      });
      console.log('in Register function');
      console.log(Data);
      const responce = await axios.post(`${Ip_Address}/Register`, Data, {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          Firebase_Auth_Token: Firebase_auth_token,
        },
      });
      await storeToken('Token', responce.data, dispatch);
      if (responce.data.Message) {
        dispatch({
          type: 'FetchUser_Fail',
          payload: responce.data.Message,
        });
      } else {
        dispatch({
          type: 'FetchUser_Sucess',
          payload: responce.data,
        });
      }
    } catch (error: any) {
      dispatch({
        type: 'FetchUser_Fail',
        payload: error.message,
      });
      console.log(error.message);
    }
  };
}

function Login_User(Msgtoken: any, Token: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'FetchUser_Request',
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
        type: 'FetchUser_Sucess',
        payload: responce.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'FetchUser_Fail',
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

function SignOut() {
  return async function (dispatch: any) {
    try {
      auth()
        .signOut()
        .then(() => console.log('User signed out in SignOut function'));
      await AsyncStorage.removeItem('Token');
      dispatch({
        type: 'SignOut',
      });
    } catch (error) {}
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

function Clear_Auth_Message() {
  return (dispatch: any) => {
    dispatch({
      type: 'Make_Auth_Message_Null',
    });
  };
}

export {
  Login_User,
  Clear_Auth_Error,
  Clear_Auth_Sucess,
  Register_User,
  FetchUser,
  SignOut,
  Clear_Auth_Message,
};
