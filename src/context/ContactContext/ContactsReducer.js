export const ACTION_GET_CONTACTS_LIST = 'ACTION_GET_CONTACTS_LIST';
export const ACTION_DELETE_CONTACT = 'ACTION_DELETE_CONTACT';
export const ACTION_EDIT_CONTACT = 'ACTION_EDIT_CONTACT';
export const ACTION_ADD_CONTACT = 'ACTION_ADD_CONTACT';
export const ACTION_SET_LOADING = 'ACTION_SET_LOADING';

export const initialState = {
  contacts: [],
  loading: false,
}

export const ContactsReducer = (state, action) =>{
  switch(action.type){
    case ACTION_GET_CONTACTS_LIST:
      return {
        ...state,
        contacts: [...action.contacts],
      };
    case ACTION_DELETE_CONTACT:
      return {
        ...state,
        contacts: [...action.contacts],
      };
    case ACTION_EDIT_CONTACT: 
      return {
        ...state,
        contacts: [...action.contacts],
      };
    case ACTION_ADD_CONTACT:
      return {
        ...state,
        contacts: [...action.contacts],
      };
    case ACTION_SET_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    default:
      return state;
  }
};