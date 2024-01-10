const Filter = ({ searchItem, handleInputChange }) => {
  return (
    <div>
      <h3>Filter shown with</h3>
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Type to search"
      />
    </div>
  );
};
export default Filter;