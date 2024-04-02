/* eslint-disable react/prop-types */
const Notification = ({ message, stl }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="error" style={stl}>
            {message}
        </div>
    )
}

export default Notification