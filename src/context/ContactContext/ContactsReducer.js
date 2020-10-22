export const ACTION_GET_CONTACTS_LIST = 'ACTION_GET_CONTACTS_LIST';
export const ACTION_DELETE_CONTACT = 'ACTION_DELETE_CONTACT';
export const ACTION_EDIT_CONTACT = 'ACTION_EDIT_CONTACT';
export const ACTION_ADD_CONTACT = 'ACTION_ADD_CONTACT';

export const ContactsReducer = (state, action) =>{
  switch(action.type){
    case ACTION_GET_CONTACTS_LIST:
      return [
        ...action.contacts,
      ];
    case ACTION_DELETE_CONTACT:
      return [
        ...action.contacts,
      ]
    case ACTION_EDIT_CONTACT: 
      return [
        ...action.contacts,        
      ];
    case ACTION_ADD_CONTACT:
      return [
        ...action.contacts,        
      ];
    default:
      return state;
  }
};