import {Ip_Address} from '../../constants/Data';
import axios from 'axios';
import {Return_Token} from '../../utils/Utils';

async function Gernerate_Paytm_Token() {
  try {
    const Token: string = (await Return_Token(
      'Gernerate_Paytm_Token_Fail',
      null,
    )) as string;
    const Data = {
      amt: 10,
    };
    return await axios // need to understand this - if i am returning below  -> response.data.ChecksumHash; then why i need to return await here
      .post(`${Ip_Address}/MakePayment`, Data, {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          authToken: Token,
        },
      })
      .then(response => {
        return response.data;
      });
  } catch (error: any) {
    return error;
  }
}

function Gernerate_Razorpay_Token(Amount: Number) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Gernerate_Razorpay_Token_Request',
      });
      const Token: string = (await Return_Token(
        'Gernerate_Razorpay_Token_Fail',
        dispatch,
      )) as string;
      const response = await axios.post(
        `${Ip_Address}/MakePayment`,
        {
          Amount: Amount,
        },
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'Gernerate_Razorpay_Token_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Gernerate_Razorpay_Token_Fail',
        payload: error.message,
      });
    }
  };
}

function Add_Wallet_Ballance(
  Transaction_Id: any,
  Message: String,
  Type: Boolean,
  Date: any,
  razorpay_payment_id: any,
  razorpay_order_id: any,
  razorpay_signature: any,
) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Add_Wallet_Request',
      });

      const Token: string = (await Return_Token(
        'Add_Wallet_Fail',
        dispatch,
      )) as string;
      const response = await axios.put(
        `${Ip_Address}/AddingCoins`,
        {
          Transaction_Id,
          Message,
          Date,
          Type,
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        },
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'Add_Wallet_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Add_Wallet_Fail',
        payload: error.message,
      });
    }
  };
}

function Get_ClubWallet_Ballance() {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'ClubWallet_Ballance_Request',
      });
      const Token: string = (await Return_Token(
        'ClubWallet_Ballance_Fail',
        dispatch,
      )) as string;
      const response = await axios.get(`${Ip_Address}/ClubWalletBallance`, {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          authToken: Token,
        },
      });
      dispatch({
        type: 'ClubWallet_Ballance_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'ClubWallet_Ballance_Fail',
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
      const response = await axios.get(`${Ip_Address}/GetUserWalletBallance`, {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          authToken: Token,
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

function GetUserTransaction() {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'GetUserTransaction_Request',
      });
      const Token: string = (await Return_Token(
        'GetUserTransaction_Fail',
        dispatch,
      )) as string;
      const response = await axios.get(`${Ip_Address}/getUserTransactions`, {
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          authToken: Token,
        },
      });
      dispatch({
        type: 'GetUserTransaction_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'GetUserTransaction_Fail',
        payload: error.message,
      });
    }
  };
}

function GetClubTransaction(GuiidId: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'GetUserTransaction_Request',
      });
      const Token: string = (await Return_Token(
        'GetUserTransaction_Fail',
        dispatch,
      )) as string;
      const response = await axios.get(
        `${Ip_Address}/getClubTransactions/${GuiidId}`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'GetUserTransaction_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'GetUserTransaction_Fail',
        payload: error.message,
      });
    }
  };
}

function GetPendingWithdrawls() {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'GetPendingWithdrawls_Request',
      });
      const Token: string = (await Return_Token(
        'GetPendingWithdrawls_Fail',
        dispatch,
      )) as string;
      const response = await axios.get(
        `${Ip_Address}/getPendingWithdrawrequest`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'GetPendingWithdrawls_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'GetPendingWithdrawls_Fail',
        payload: error.message,
      });
    }
  };
}

function Create_withdrawls_request(Amount: any) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Create_withdrawls_Request',
      });

      const Token: string = (await Return_Token(
        'Create_withdrawls_Fail',
        dispatch,
      )) as string;
      const response = await axios.post(
        `${Ip_Address}/createWithdrawls`,
        {
          Amount: Amount,
        },
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'Create_withdrawls_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'Create_withdrawls_Fail',
        payload: error.message,
      });
    }
  };
}

function GetMoneyRefund(Match_Id: string) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'GetMoneyRefund_Request',
      });
      const Token: string = (await Return_Token(
        'GetMoneyRefund_Fail',
        dispatch,
      )) as string;
      const response = await axios.get(
        `${Ip_Address}/GetMoneyRefund/${Match_Id}`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      dispatch({
        type: 'GetMoneyRefund_Sucess',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'GetMoneyRefund_Fail',
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
  Add_Wallet_Ballance,
  GetUserWalletBallance,
  Clear_Payment_Reducer_Error,
  Clear_Payment_Reducer_Sucess,
  Gernerate_Paytm_Token,
  Gernerate_Razorpay_Token,
  Get_ClubWallet_Ballance,
  GetUserTransaction,
  GetClubTransaction,
  Create_withdrawls_request,
  GetPendingWithdrawls,
  GetMoneyRefund,
};
