import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAudio } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@mui/material';

export default ({ onInput }) => {
    const inputReference = useRef(null);

    const handleClick = (_) => {
        inputReference.current.click();
    };

    return (
        <>
            <input
                ref={inputReference}
                type='file'
                onChange={onInput}
                style={{ display: 'none' }}
            />

            <Button onClick={handleClick} variant="contained" >
                <FontAwesomeIcon icon={faFileAudio} />
            </Button> 
        </>
    );
};