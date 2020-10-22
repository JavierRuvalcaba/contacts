import React, {createContext, useReducer, useContext, useEffect } from 'react';
import * as reducer from './ContactsReducer';
import mainAxios from '../../helpers/axios';

const ContactsContext = createContext();

export const ContactsProvider = ({children}) => {
  const [ contacts, dispatch ] = useReducer(reducer.ContactsReducer, []);

  const getContactsList = async (page = 1) => {
    try{
      const response = await mainAxios.get(`/api/users?page=${page}`);

      dispatch({
        type: reducer.ACTION_GET_CONTACTS_LIST,
        contacts: response.data.data
      });
    }
    catch(e){
      console.log(e);
    }
  };

  useEffect(() => {
    getContactsList();
  }, [])

  const deleteContact = async (id) => {
    try{
      const response = await mainAxios.delete(`/api/users/${id}`);
      let newContacts = [...contacts];

      if(response.status === 204){
        const indexToRemove = newContacts.findIndex(c => c.id === id);
        newContacts.splice(indexToRemove, 1);
      }

      dispatch({
        type: reducer.ACTION_DELETE_CONTACT,
        contacts: newContacts
      });
    }
    catch(e){
      console.log(e);
    }
  }
  
  const editContact = async (id, contact) => {
    try{
      const response = await mainAxios.put(`/api/users/${id}`, contact);
      let newContacts = [...contacts];

      if(response.status === 200){
        const indexToUpdate = newContacts.findIndex(c => c.id === id);
        newContacts[indexToUpdate] = response.data;
      }

      dispatch({
        type: reducer.ACTION_EDIT_CONTACT,
        contacts: newContacts
      });
    }
    catch(e){
      console.log(e);
    }
  }
  
  const addContact = async (contact) => {
    try{
      const response = await mainAxios.post(`/api/users`, contact);
      let newContacts = [...contacts];
      
      if(response.status === 201){
        newContacts = newContacts.concat(response.data);
      }

      dispatch({
        type: reducer.ACTION_ADD_CONTACT,
        contacts: newContacts
      });
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        getContactsList,
        deleteContact,
        editContact,
        addContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  )
}

const useContacts = () => useContext(ContactsContext);

export default useContacts;