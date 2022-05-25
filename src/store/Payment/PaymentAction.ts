import {Ip_Address} from '../../constants/Data';
import axios from 'axios';
import {Return_Token} from '../../utils/Utils';

async function Gernerate_Paytm_Token() {
  try {
    const Token: string = (await Return_Token(
      'Gernerate_Paytm_Token_Fail',
      null,
    )) as string;
    const parsedToken = JSON.parse(Token);

    const Data = {
      amt: 10,
    };

    return await axios // need to understand this - if i am returning below  -> response.data.ChecksumHash; then why i need to return await here
      .post(`${Ip_Address}/MakePayment`, Data, {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          authToken: parsedToken,
        },
      })
      .then(response => {
        return response.data;
      });
  } catch (error: any) {
    return error;
  }
}

function Make_Payment_action(Data: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Make_Payment_Request',
      });
      const Token: string = (await Return_Token(
        'Make_Payment_Fail',
        dispatch,
      )) as string;
      const parsedToken = JSON.parse(Token);

      const response = await axios.post(`${Ip_Address}/MakePayment`, Data, {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          authToken: parsedToken,
        },
      });
      dispatch({
        type: 'Make_Payment_Sucess',
        payload: response.data.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Make_Payment_Fail',
        payload: error.message,
      });
    }
  };
}

function Update_Wallet_Ballance(New_Ballance: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Update_Wallet_Request',
      });
      const Token: string = (await Return_Token(
        'Update_Wallet_Fail',
        dispatch,
      )) as string;
      const parsedToken = JSON.parse(Token);
      const response = await axios.put(
        `${Ip_Address}/AddingCoins`,
        {New_Ballance: New_Ballance},
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: parsedToken,
          },
        },
      );
      dispatch({
        type: 'Update_Wallet_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Update_Wallet_Fail',
        payload: error.message,
      });
    }
  };
}

function GetUserWalletBallance() {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'GetUserWalletBallance_Request',
      });
      const Token: string = (await Return_Token(
        'GetUserWalletBallance_Fail',
        dispatch,
      )) as string;
      const parsedToken = JSON.parse(Token);

      const response = await axios.get(`${Ip_Address}/GetUserWalletBallance`, {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          authToken: parsedToken,
        },
      });
      dispatch({
        type: 'GetUserWalletBallance_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'GetUserWalletBallance_Fail',
        payload: error.message,
      });
    }
  };
}

function Clear_Payment_Reducer_Error() {
  return (dispatch: any) => {
    dispatch({
      type: 'Clear_Wallet_Error',
    });
  };
}

function Clear_Payment_Reducer_Sucess() {
  return (dispatch: any) => {
    dispatch({
      type: 'Clear_Wallet_Sucess',
    });
  };
}

export {
  Make_Payment_action,
  Update_Wallet_Ballance,
  GetUserWalletBallance,
  Clear_Payment_Reducer_Error,
  Clear_Payment_Reducer_Sucess,
  Gernerate_Paytm_Token,
};
