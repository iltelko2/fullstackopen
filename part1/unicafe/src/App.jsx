import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const FeedBack = (props) => {
  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={props.incrGood} text="good" />
      <Button handleClick={props.incrNeutral} text="neutral" />
      <Button handleClick={props.incrBad} text="bad" />
    </>
  )
}

const StatisticLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr> 

const Statistics = (props) => {
  if (props.good == 0 && props.neutral == 0 && props.bad == 0) {
    return (
      <>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }

  const all = props.good + props.neutral + props.bad
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={(100 * props.good / all).toString().concat(' %')} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrGood = () => {
    console.log('set good to ', good + 1);
    setGood(good + 1)
  }
  const incrNeutral = () => {
    console.log('set neutral to ', neutral + 1);
    setNeutral(neutral + 1)
  }
  const incrBad = () => {
    console.log('set bad to ', bad + 1);
    setBad(bad + 1)
  }

  return (
    <div>
      <FeedBack incrGood={incrGood} incrNeutral={incrNeutral} incrBad={incrBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App