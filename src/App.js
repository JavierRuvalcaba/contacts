import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Contacts from './scenes/Contacts';
import ContactDetails from './scenes/Contacts/ContactDetails';
import { ContactsProvider } from './context/ContactContext/ContactsContext';
import './App.css';
import './mockAxios.js';

const App = () => {
  return (
    <div className="App">
      <ContactsProvider>        
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Contacts} />
            <Route exact path='/details/:id' component={ContactDetails} />
          </Switch>
        </BrowserRouter>
      </ContactsProvider>
    </div>
  );
}

export default App;
