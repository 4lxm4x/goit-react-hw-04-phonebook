import { useEffect, useState } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import Contacts from 'components/Contacts/Contacts';
import Filter from './components/Filter/Filter';
import './App.css';

export default function App () {
  const [contacts, setContacts]=useState(()=>{if (localStorage.contacts !== 'null'){
    return ( JSON.parse(localStorage.getItem('contacts')))
    

  }});
  const [filter,setFilter]=useState('');



useEffect(() => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
},[contacts]);



  function onHandleFilter (input)  {
    setFilter( input.currentTarget.value.toLowerCase())
  }

  function filterContacts ()  {
    let filteredContacts = [];
    filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    ) 

    return filteredContacts;
  };

  function onHandleFormSubmit (contact) {
    
    for (let contactInState of contacts) {
      if (contact.name.toLowerCase() === contactInState.name.toLowerCase()) {
        return alert(`${contact.name} is already in the list.`);
      }
    }
    
    setContacts((contacts)=> {
      
      return [...contacts,contact]
    })


  };

  function deleteContact (e)  {
    const deletedContactName = e.target.id;
    let updatedContacts = [];

    updatedContacts = contacts.filter(
      contactInState =>
        deletedContactName.toLowerCase() !== contactInState.name.toLowerCase()
    );
setContacts(updatedContacts);
  };

  
    return (
      <div className="mainDiv">
        <h1>Phonebook</h1>
        <ContactForm onFormSubmit={onHandleFormSubmit} />
        <h1>Contacts</h1>
        <Filter input={onHandleFilter} />
        <Contacts
          contactsList={filterContacts()}
          onDelete={deleteContact}
        ></Contacts>
      </div>
    );
  }


