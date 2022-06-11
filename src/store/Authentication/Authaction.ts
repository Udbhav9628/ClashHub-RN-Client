import axios from 'axios';
import {Ip_Address} from '../../constants/Data';
import {storeToken} from '../../utils/Utils';
import {useSelector} from 'react-redux';

function Register_User(Data: any, Firebase_auth_token: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Login_Request',
      });
      console.log('Printing token');
      console.log(Firebase_auth_token);
      console.log('Printing Data');
      console.log(Data);

      const responce = await axios.post(`${Ip_Address}/Register`, Data, {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          Firebase_Auth_Token: Firebase_auth_token,
        },
      });
      console.log(responce.data);

      // await storeToken('Token', responce.data.Auth_Token, dispatch);
      // dispatch({
      //   type: 'Login_Sucess',
      //   payload: responce.data,
      // });
    } catch (error: any) {
      dispatch({
        type: 'Login_Fail',
        payload: error.message,
      });
    }
  };
}

function Login_User(Token: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Login_Request',
      });
      const responce = await axios.get(`${Ip_Address}/Login`, {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          Firebase_Auth_Token: Token,
        },
      });
      // await storeToken('Token', responce.data.Auth_Token, dispatch);
      // dispatch({
      //   type: 'Login_Sucess',
      //   payload: responce.data,
      // });
    } catch (error: any) {
      dispatch({
        type: 'Login_Fail',
        payload: error.message,
      });
    }
  };
}

// function FirebaseAuth(user: any) {
//   return async function (dispatch: any) {
//     if (user) {
//       dispatch({
//         type: 'Firebase_Get_User_Sucess',
//         payload: user.phoneNumber,
//       });
//       console.log('In Authaction');
//       console.log(user.phoneNumber);
//     } else {
//       dispatch({
//         type: 'Firebase_Get_User_Fail',
//         payload: 'User Not Found in Firebase Login',
//       });
//       console.log('No User Signed in');
//     }
//   };
// }

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
  // FirebaseAuth,
};
