export const Get_All_Guild = (state = [], action: any) => {
  switch (action.type) {
    case 'Fetch_All_Guild_Request':
      return {
        Guild_loading: true,
      };
    case 'Fetch_All_Guild_Sucess':
      return {
        Guild_loading: false,
        All_Guilds: action.payload,
        Sucess: true,
      };
    case 'Fetch_All_Guild_Fail':
      return {
        Guild_loading: false,
        Guild_Error: action.payload,
        Sucess: false,
      };
    case 'Clear_Guild_Reducer_Error':
      return {
        ...state,
        Guild_Error: null,
      };
    case 'Clear_Guild_Reducer_Sucess':
      return {
        ...state,
        Sucess: null,
      };
    default:
      return state;
  }
};

export const Get_user_Guild_details_reducer = (State = [], action: any) => {
  switch (action.type) {
    case 'get_User_Guild_Details_Request':
      return {
        loading: true,
      };
    case 'get_User_Guild_Details_Sucess':
      return {
        sucess: true,
        loading: false,
        Guild_Details: action.payload.Message,
        Sucess_response: action.payload.status,
      };
    case 'get_User_Guild_Details_Fail':
      return {
        sucess: false,
        loading: false,
        Error: action.payload,
      };
    case 'Clear_Guild_Reducer_Error':
      return {
        ...State,
        Error: null,
      };
    default:
      return State;
  }
};

export const Create_Guild_Reducer = (State = [], action: any) => {
  switch (action.type) {
    case 'Create_Guild_Request':
      return {
        loading: true,
      };
    case 'Create_Guild_Sucess':
      return {
        sucess: true,
        loading: false,
        Response: action.payload,
      };
    case 'Create_Guild_Fail':
      return {
        sucess: false,
        loading: false,
        Error: action.payload,
      };
    case 'Clear_Guild_Reducer_Error':
      return {
        ...State,
        Error: null,
      };
    case 'Clear_Guild_Reducer_Sucess':
      return {
        ...State,
        sucess: null,
      };
    default:
      return State;
  }
};

export const Join_Guild_Reducer = (state = [], action: any) => {
  switch (action.type) {
    case 'Join_Guild_Request':
      return {
        loading: true,
      };
    case 'Join_Guild_Sucess':
      return {
        loading: false,
        Sucess: true,
        Responce: action.payload,
      };
    case 'Join_Guild_Fail':
      return {
        loading: false,
        Sucess: false,
        Error: action.payload,
      };
    case 'Clear_Guild_Reducer_Error':
      return {
        ...state,
        Error: null,
      };
    case 'Clear_Guild_Reducer_Sucess':
      return {
        ...state,
        Sucess: null,
      };
    default:
      return state;
  }
};
export const Get_Specific_Club_Reducer = (state = [], action: any) => {
  switch (action.type) {
    case 'Get_Specific_Club_Request':
      return {
        loading: true,
      };
    case 'Get_Specific_Club_Sucess':
      return {
        loading: false,
        Sucess: true,
        Responce: action.payload,
      };
    case 'Get_Specific_Club_Fail':
      return {
        loading: false,
        Sucess: false,
        Error: action.payload,
      };
    case 'Clear_Guild_Reducer_Error':
      return {
        ...state,
        Error: null,
      };
    case 'Clear_Guild_Reducer_Sucess':
      return {
        ...state,
        Sucess: null,
      };
    default:
      return state;
  }
};

export const Update_Club_Pic_Reducer = (state = [], action: any) => {
  switch (action.type) {
    case 'Update_Club_Pic_Request':
      return {
        loading: true,
      };
    case 'Update_Club_Pic_Sucess':
      return {
        loading: false,
        Sucess: true,
      };
    case 'Update_Club_Pic_Fail':
      return {
        loading: false,
        Sucess: false,
        Error: action.payload,
      };
    case 'Clear_Guild_Reducer_Error':
      return {
        ...state,
        Error: null,
      };
    case 'Clear_Guild_Reducer_Sucess':
      return {
        ...state,
        Sucess: null,
      };
    default:
      return state;
  }
};
