const Notification = ({ message, messageCorrect }) => {
  if (message === null && messageCorrect === null) {
    return null;
  }
  return (
    <>
      {message && <div className="error">{message}</div>}
      {messageCorrect && <div className="correct">{messageCorrect}</div>}
    </>
  );
};

export default Notification;
