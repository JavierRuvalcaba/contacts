import React, {createContext, useReducer, useContext, useEffect } from 'react';
import * as reducer from './ContactsReducer';
import mainAxios, { axiosMock } from '../../helpers/axios';

const ContactsContext = createContext();

export const ContactsProvider = ({children}) => {
  const [ contacts, dispatch ] = useReducer(reducer.ContactsReducer, reducer.initialState);

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
      dispatch({ type: reducer.ACTION_SET_LOADING });
      const response = await mainAxios.delete(`/api/users/${id}`);
      let newContacts = [...contacts.contacts];

      if(response.status === 204){
        const indexToRemove = newContacts.findIndex(c => parseInt(c.id) === parseInt(id));
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
    
    dispatch({ type: reducer.ACTION_SET_LOADING });
  }
  
  const editContact = async (id, contact) => {
    try{
      dispatch({ type: reducer.ACTION_SET_LOADING });
      const response = await mainAxios.put(`/api/users/${id}`, contact);
      let newContacts = [...contacts.contacts];

      if(response.status === 200){
        const indexToUpdate = newContacts.findIndex(c => parseInt(c.id) === parseInt(id));
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
    dispatch({ type: reducer.ACTION_SET_LOADING });
  }
  
  const addContact = async (contact) => {
    try{
      dispatch({ type: reducer.ACTION_SET_LOADING });
      await axiosMock.post('/api/add-image',{ image: contact.avatar });
      const response = await mainAxios.post(`/api/users`, contact);
      let newContacts = [...contacts.contacts];
      
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
    dispatch({ type: reducer.ACTION_SET_LOADING });
  }

  return (
    <ContactsContext.Provider
      value={{
        contacts: contacts.contacts,
        loading: contacts.loading,
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