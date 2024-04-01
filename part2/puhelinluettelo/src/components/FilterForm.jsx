/* eslint-disable react/prop-types */
const FilterForm = ({ desc, handleFilterChange }) => {
    return (
        <div>
            {desc} <form><input onChange={handleFilterChange} /></form>
        </div>
    )
}

export default FilterForm