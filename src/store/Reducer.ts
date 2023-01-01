import {combineReducers} from 'redux';
import {
  FetchUser_reducer,
  Get_Specific_User_Details_reducer,
} from './Authentication/Authreducer';
import {
  Get_Home_Page_Matches,
  Create_matches_Reducer,
  Join_Match_Reducer,
  Update_Match_Result_Reducer,
  Update_Room_Details_Reducer,
  Update_Video_Reducer,
  Fetch_Match_Room_Details,
} from './Match/Matchreducer';
import {
  Add_Wallet_Ballance_Reducer,
  Get_Ballance_Reducer,
  ClubWallet_Ballance_reducer,
  Create_withdrawls_Reducer,
  Razorpay_Token_Reducer,
  Money_Refund_Reducer,
} from './Payment/PaymentReducer';
import {
  Get_All_Guild,
  Get_user_Guild_details_reducer,
  Create_Guild_Reducer,
  Join_Guild_Reducer,
  Get_Specific_Club_Reducer,
} from './Guild/GuildReducer';

export default combineReducers({
  Get_Home_Page_Matches,
  Create_matches_Reducer,
  Join_Match_Reducer,
  Add_Wallet_Ballance_Reducer,
  Get_Ballance_Reducer,
  Get_All_Guild,
  Get_user_Guild_details_reducer,
  Create_Guild_Reducer,
  Update_Match_Result_Reducer,
  FetchUser_reducer,
  ClubWallet_Ballance_reducer,
  Create_withdrawls_Reducer,
  Get_Specific_User_Details_reducer,
  Join_Guild_Reducer,
  Get_Specific_Club_Reducer,
  Update_Room_Details_Reducer,
  Update_Video_Reducer,
  Fetch_Match_Room_Details,
  Razorpay_Token_Reducer,
  Money_Refund_Reducer,
});
