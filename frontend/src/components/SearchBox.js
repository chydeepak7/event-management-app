import React, {useState, useEffect} from 'react';
import {Button, Form} from 'react-bootstrap'
import {useNavigate} from "react-router-dom";

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    const history = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword){
            history(`/?keyword=${keyword}`)
        } else {
            history(`/`)

        }
    }
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control type='text' name='q'
                          onChange={(e) => setKeyword(e.target.value)}
                          className='mr-sm-2 ml-sm-5' >
            </Form.Control>
        <Button type='submit' className='p-2' >Submit</Button>
            
        </Form>
    );
};

export default SearchBox;