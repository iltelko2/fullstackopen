/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import ContactInputForm from './components/ContactInputForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const divStyleErr = {
    color: 'red'
  };
  const divStyleMsg = {
    color: 'green'
  };
  const [style, setStyle] = useState(divStyleMsg)

  const addNotification = (message) => {
    setStyle(divStyleMsg)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  };
  const addError = (message) => {
    setStyle(divStyleErr)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  };

  useEffect(() => {
    personsService.getAll().then(response => {
      setPersons(response)
    })
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const newEntry = {
      name: newName,
      number: newNumber
    }

    if (newName === '') {
      addNotification('forgot to give name?');
      return;
    }

    if (newNumber === '') {
      addNotification('forgot to give number?');
      return;
    }

    const foundIndex = persons.findIndex((person) => person.name === newName);
    if (foundIndex !== -1) {
      if (!confirm(`${newName} is already added to the phonebook, do you want to replace?`)) {
        return;
      }
      const personId = persons[foundIndex].id;
      personsService.update(personId, { ...newEntry, id: personId })
        .then((resp) => {
          setPersons(persons.map(person => person.id !== personId ? person : resp))

          addNotification(`person ${newEntry.name} had phone number updated`);
        })

      setNewName('');
      setNewNumber('');

      return;
    }

    personsService.create(newEntry).then(resp => setPersons(persons.concat(resp)));

    addNotification(`added number for person ${newEntry.name}`);

    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const deletePerson = (person) => {
    const kia = confirm(`Are you sure want to delete ${person.name}`)
    if (kia) {
      personsService.deleteObject(person.id).then(rid => {
        setPersons(persons.filter(person => person.id != rid))
        addNotification(
          `the person '${person.name}' was deleted from server`
        )
      })
        .catch(err => {
          addError(
            `the person '${person.name}' was already deleted from server`
          )
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} stl={style} />
      <FilterForm desc="filter shown with:" handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <ContactInputForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Filter persons={persons} filter={filter} handleDelete={deletePerson} />
    </div>
  )

}

export default App