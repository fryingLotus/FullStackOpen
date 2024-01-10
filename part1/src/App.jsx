import React, { useState } from 'react';
import Button from './Component/Button';
import './statistic.css';
const Statistics = (props) => {
  const { good, bad, neutral, all, average, positive } = props;
  if (props.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <div className="grid-container">
        <p>Good: </p>
        <p>{good}</p>
       <p>Bad</p>
       <p>{bad}</p>
       <p>Neutral</p>
       <p>{neutral}</p>
       <p>Average:</p>
       <p>{average}</p>
       <p>Total</p>
       <p>{all}</p>
       <p>Positive:</p>
       <p>{positive}</p>

      
      </div>
    </div>
  );

  // ...
  // const all = good + bad + neutral;
  // const average = ((good - bad) / all).toFixed(2);
  // const positive = ((good / all) * 100).toFixed(2);
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // const handleGoodButton = () => {
  //   setGood(good + 1);
  //   setTotalFeed(good + bad + neutral + 1)
  // }
  const all = good + bad + neutral;
  const average = ((good - bad) / all).toFixed(2);
  const positive = ((good / all) * 100).toFixed(2);
  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text="Good" />
        <Button handleClick={() => setBad(bad + 1)} text="Bad" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />

        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          average={average}
          all={all}
          positive={positive}
        />
      </div>
    </div>
  );
};

export default App;
