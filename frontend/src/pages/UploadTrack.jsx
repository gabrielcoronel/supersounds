import { useState } from 'react';

export default () => {
    const [formState, setFormState] = useState({
        title: "",
        audio: File,
        categories: []
    });

    const updateTitle = (newTitle) => {
    };

    return (
        <form>
            <label>
                Título

                <input
                    type="text"
                    value={formState.title}
                    onChange={(event) => setFormState({ ...formState, })}
                />
            </label>
        </form>
    );
};