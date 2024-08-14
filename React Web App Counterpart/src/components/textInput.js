import React, { useEffect, useState } from 'react';
import './textInput.css'

function TextInput({id, text, onChange, passOrtext}) {

    const initialValue = 1

    const [value, setValue] = useState(initialValue);

    // Update local state when initialValue changes
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
  
    const handleClick = () => {

    }

    return (
        <>
            <div className="input-wrapper">
                <label for={id} className="textLabel">{text}</label>
                <input type={passOrtext} name={id} onClick={handleClick} onChange={onChange}/>
            </div>
            
        </>
    );
  }
  
export default TextInput