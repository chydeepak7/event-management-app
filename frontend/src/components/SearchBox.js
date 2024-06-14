import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    let queryParams = [];
    if (keyword) {
      queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
    }
    if (date) {
      queryParams.push(`date=${encodeURIComponent(date)}`);

    }
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    navigate(`/search${queryString}`);
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="keyword"
        placeholder="Search by title"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-2"
      />
      <Form.Control
        type="date"
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="mr-sm-2 ml-sm-2"
      />
      <Button type="submit" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
