import {combineReducers} from 'redux';
import {FetchUser_reducer} from './Authentication/Authreducer';
import {
  Get_Home_Page_Matches,
  Create_matches_Reducer,
  Get_All_Matches,
  Join_Match_Reducer,
  Get_Joined_Match_Reducer,
  Update_Match_Result_Reducer,
} from './Match/Matchreducer';
import {
  Make_Payment_Reducer,
  Get_Ballance_Reducer,
} from './Payment/PaymentReducer';
import {
  Get_All_Guild,
  Get_user_Guild_details_reducer,
  Create_Guild_Reducer,
  Get_Guild_Matchs_Reducer,
} from './Guild/GuildReducer';

export default combineReducers({
  Get_Home_Page_Matches,
  Create_matches_Reducer,
  Get_All_Matches,
  Join_Match_Reducer,
  Get_Joined_Match_Reducer,
  Make_Payment_Reducer,
  Get_Ballance_Reducer,
  Get_All_Guild,
  Get_user_Guild_details_reducer,
  Create_Guild_Reducer,
  Get_Guild_Matchs_Reducer,
  Update_Match_Result_Reducer,
  FetchUser_reducer,
});
