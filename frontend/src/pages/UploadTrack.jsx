import { useState } from 'react';
import { useMutation } from 'react-query';

import CategoriesField from '../components/CategoriesField';
import FileInput from '../components/FileInput';
import * as trackService from '../services/tracksService';

export default () => {
    const [formState, setFormState] = useState({
        title: "",
        audio: null,
        categories: []
    });
    const mutation = useMutation((track) => trackService.add(track));

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
                Subir
            </button>
        </div>
    );
};