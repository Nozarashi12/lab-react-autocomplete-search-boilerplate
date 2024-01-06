import React, { useState, useEffect } from 'react';

const Textbox = () => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('/countryData.json')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching country data:', error));
  }, []);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchText(inputText);
    const filteredSuggestions = countries.filter(country =>
      country.name.toLowerCase().includes(inputText.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleSearchSubmit = () => {
    console.log(`Search submitted with text: ${searchText}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  return (
    <>
      <h1>Search.</h1>
      <div className='inputbox'>
        <input
          className='box'
          type='text'
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} 
          placeholder='Type to search...'
        />
        <button className='btn' onClick={handleSearchSubmit}>
          Submit
        </button>
      </div>
      <ul>
        {suggestions.map((country, index) => (
          <p key={index}>{country.name}</p>
        ))}
      </ul>
    </>
  );
};

export default Textbox;
