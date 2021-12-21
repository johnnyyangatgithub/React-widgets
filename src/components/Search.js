import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('programming');
    const [results, setResults] = useState([]);
    const [debouncedTerm, setDebouncedTerm] = useState(term);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        }
    }, [term]);

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm
                }
            });
            setResults(data.query.search);
        };
        search();
    }, [debouncedTerm]);

    const renderedResult = results.map((result) => {
        return (
            <div key={result.pageid} className='item'>
                <div className='right floated content'>
                    <a className='ui button' href={`https://en.wekipedia.org?curid=${result.pageid}`}>Go</a>
                </div>
                <div className='content'>
                    <div className='header'>
                        {result.title}
                    </div>
                    {result.snippet}
                </div>
            </div>
        );
    });

    return (
        <div className='ui form'>
            <div className='field'>
                <label>Enter search term</label>
                <input
                    className='input'
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                />
            </div>
            <div className='ui celled list'>{renderedResult}</div>
        </div>
    );
};

export default Search;
