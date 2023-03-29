import { useState } from 'react';
import { useMutation } from 'react-query';
import { TextField, Button } from '@mui/material';

import CategoriesField from '../components/CategoriesField';
import FileInput from '../components/FileInput';

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "fit-content",
        gap: "2rem",
        margin: "auto"
    }
};

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
        <div style={styles.form}>
            <TextField
                label="Título"
                variant="standard"
                value={formState.title}
                onChange={(event) => updateTitle(event.target.value)}
            />

            <CategoriesField
                categories={formState.categories}
                setCategories={updateCategories}
            />

            <FileInput onInput={handleFileInput} />

            <Button onClick={(_) => mutation.mutate(formState)} variant="contained">
                {submitText}
            </Button>
        </div>
    );
};