import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const [date, setDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalParticipants, setTotalParticipants] = useState('');
    const history = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        let query = `/search/?`;
        if (keyword) query += `keyword=${keyword}&`;
        if (date) query += `date=${date}&`;
        if (endDate) query += `endDate=${endDate}&`;

        history(query);
    };

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type="text"
                name="keyword"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Events..."
                className="mr-sm-2 ml-sm-5"
            />
            <Form.Control
                type="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
                className="mr-sm-2 ml-sm-5"
            />
            <Form.Control
                type="date"
                name="endDate"
                onChange={(e) => setEndDate(e.target.value)}
                className="mr-sm-2 ml-sm-5"
            />

            <Button type="submit" variant="outline-success" className="p-2">
                Search
            </Button>
        </Form>
    );
};

export default SearchBox;
