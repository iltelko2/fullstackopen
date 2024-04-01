/* eslint-disable react/prop-types */

import { useState } from 'react'
import FilterForm from './components/FilterForm'
import ContactInputForm from './components/ContactInputForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault();

    if (persons.findIndex((person) => person.name === newName) !== -1) {
      alert(`${newName} is already added to the phonebook!`);
      return;
    }

    if (newNumber === '') {
      alert('forgot to give number?');
      return;
    }

    if (newName === '') {
      alert('forgot to give name?');
      return;
    }

    const newEntry = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newEntry));

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

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm desc="filter shown with:" handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <ContactInputForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Filter persons={persons} filter={filter} />
    </div>
  )

}

export default App