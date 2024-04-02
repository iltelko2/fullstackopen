/* eslint-disable react/prop-types */
const Number = ({ person }) => <p>{person.name} {person.number}</p>

const Button = ({ p, handleDelete }) => <button type="button" onClick={() => handleDelete(p)}>delete</button>

const Filter = ({ persons, filter, handleDelete }) => {
    return persons.filter(person => filter === '' ?
        true :
        person.name.toLowerCase().startsWith(filter.toLowerCase())).map(person =>
            <div key={person.name} >
                <Number person={person} />
                <Button p={person} handleDelete={handleDelete} />
            </div>
        )
}

export default Filter
