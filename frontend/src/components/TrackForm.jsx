import { useState } from 'react';
import { useMutation } from 'react-query';

import CategoriesField from '../components/CategoriesField';
import FileInput from '../components/FileInput';

export default ({ submitText, onSubmit, initialData }) => {
    const [formState, setFormState] = useState(initialData);
    const mutation = useMutation((track) => onSubmit(track));

    const updateTitle = (newTitle) => {
        setFormState({ ...formState, title: newTitle });
    };

    const updateCategories = (newCategories) =>  {
        setFormState({ ...formState, categories: newCategories });
    };

    const handleFileInput = (event) => {
        const files = event.target.files;

        if (!files || !files[0]) {
            return;
        }

        const newAudio = files[0];

        setFormState({ ...formState, audio: newAudio });
    };

    if (mutation.isError) {
        return "Error";
    }

    return (
        <div>
            <label>
                Título

                <input
                    type="text"
                    value={formState.title}
                    onChange={(event) => updateTitle(event.target.value)}
                />
            </label>

            <label>
                Categorías

                <CategoriesField
                    categories={formState.categories}
                    setCategories={updateCategories}
                />
            </label>

            <label>
                Archivo

                <FileInput onInput={handleFileInput} />
            </label>

            <button onClick={(_) => mutation.mutate(formState)}>
                {submitText}
            </button>
        </div>
    );
};