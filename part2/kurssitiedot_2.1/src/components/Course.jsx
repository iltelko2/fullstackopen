/* eslint-disable react/prop-types */
const Header = ({ title }) => (
    <h1>{title}</h1>
)

const Part = (props) => (
    <p>
        {props.part} {props.exercise}
    </p>
)

const Content = ({ parts }) => (
    <>
        {parts.map(part => <Part part={part.name} key={part.id} exercise={part.exercises} />)}
    </>
)

const Total = (props) => (
    <p>Total of {props.sum} exercises</p>
)

const Course = ({ course }) => (
    <>
        <Header title={course.name} />
        <Content parts={course.parts} />
        <Total sum={course.parts.map(part => part.exercises).reduce((acc, curr) => acc + curr, 0)} />
    </>
)

export default Course