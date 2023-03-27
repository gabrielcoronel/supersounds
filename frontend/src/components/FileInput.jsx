import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAudio } from '@fortawesome/free-solid-svg-icons'

const styles = {
    fileInput: {
        display: 'none'
    },
    button: {
    }
};

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
                style={styles.fileInput}
            />

            <button
                onClick={handleClick}
                style={styles.button}
            >
                <FontAwesomeIcon icon={faFileAudio} />
            </button> 
        </>
    );
};