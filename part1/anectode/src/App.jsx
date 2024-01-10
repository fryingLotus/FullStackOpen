import React, { useState } from 'react';
import { createLogger } from 'vite';

const Header = ({ name }) => <h2>{name}</h2>;

const Anecdote = ({ text, votesCount }) => (
  <div>
    <p>{text}</p>
    <p>has {votesCount} votes</p>
  </div>
);

const Winner = ({ winningAnecdote, highestVoteCount }) => {
  if (highestVoteCount === 0) {
    return <p>No votes yet</p>;
  }

  return (
    <div>
      <p>{winningAnecdote}</p>
      <p>has {highestVoteCount} votes</p>
    </div>
  );
};

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
);

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [allVotes, setAllVotes] = useState(Array(anecdotes.length).fill(0));

  const handleVoteClick = () => {
    const newAllVotes = [...allVotes];
    newAllVotes[selected] += 1;
    setAllVotes(newAllVotes);
  };

  const handleAnecdoteClick = () => {
    const arrayIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(arrayIndex);
  };

  const highestVoteCount = Math.max(...allVotes);
  const winnerIndex = allVotes.indexOf(highestVoteCount);
  const winningAnecdote = anecdotes[winnerIndex];

  return (
    <div>
      <Header name="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votesCount={allVotes[selected]} />
      <Button onClick={handleVoteClick} text="vote" />
      <Button onClick={handleAnecdoteClick} text="Next anecdote" />

      <Header name="Anecdote with most votes" />
      <Winner winningAnecdote={winningAnecdote} highestVoteCount={highestVoteCount} />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

export default () => <App anecdotes={anecdotes} />;
