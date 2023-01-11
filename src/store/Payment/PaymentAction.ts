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

function Check_Payment_Status(razorpay_order_id: string) {
  return async function (dispatch: any) {
    try {
      dispatch({
        type: 'Check_Payment_Status_Request',
      });
      const Token: string = (await Return_Token(
        'Check_Payment_Status_Fail',
        dispatch,
      )) as string;
      const response = await axios.get(
        `${Ip_Address}/GetPaymentStatus/${razorpay_order_id}`,
        {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
            authToken: Token,
          },
        },
      );
      console.log(response.status);
      dispatch({
        type: 'Check_Payment_Status_Sucess',
        payload: response.status,
      });
    } catch (error: any) {
      dispatch({
        type: 'Check_Payment_Status_Fail',
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

function Create_withdrawls_request(
  Amount: Number,
  Upi_id: String,
  Is_Club: Boolean,
) {
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
          UPI_Id: Upi_id,
          Is_Club,
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
  Check_Payment_Status,
  GetUserWalletBallance,
  Clear_Payment_Reducer_Error,
  Clear_Payment_Reducer_Sucess,
  Gernerate_Paytm_Token,
  Gernerate_Razorpay_Token,
  Get_ClubWallet_Ballance,
  Create_withdrawls_request,
  GetMoneyRefund,
};
