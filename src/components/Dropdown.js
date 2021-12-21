import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const onBodyClick = (event) => {
            //ref.current.contains is gonna to see if (event.target) is inside of ref.current or not 
            if (ref.current.contains(event.target)) {
                //if yes, return early
                return;
            }
            //Otherwise, I'll close the dropdown list by set props of 'open' to false
            setOpen(false);
        };
        document.body.addEventListener("click", onBodyClick, { capture: true });
        //Clean up function---> Every time our dropdown is removed from DOM, this clean up function will be called automatically for remove listener
        return () => {
            document.body.removeEventListener("click", onBodyClick, {
                capture: true,
            });
        };
    }, []);

    const renderedOptions = options.map((option) => {
        if (option.value === selected.value) {
            return null;
        }
        return (
            <div
                key={option.value}
                className='item'
                onClick={() => { onSelectedChange(option) }}
            >
                {option.label}
            </div>
        );
    });

    return (
        <div ref={ref} className='ui form'>
            <div className='field'>
                <label className='label'>{label}</label>
                <div
                    onClick={() => setOpen(!open)}
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                >
                    <i className='dropdown icon'></i>
                    <div className='text'>{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>{renderedOptions}</div>
                </div>
            </div>
        </div >
    );
};

export default Dropdown;