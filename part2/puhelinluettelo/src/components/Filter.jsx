/* eslint-disable react/prop-types */
const Number = ({ person }) => <p>{person.name} {person.number}</p>

const Filter = ({ persons, filter }) => {
    return persons.filter(person => filter === '' ? true : person.name.toLowerCase().startsWith(filter.toLowerCase())).map(person => <Number key={person.name} person={person} />)
}

export default Filter
