import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { TextField, Button } from '@mui/material';

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "1rem"
    }
};

export default ({ categories, setCategories }) => {
    const addCategory = () => {
        setCategories([...categories, ""]);
    };

    const editCategory = (key, newCategory) => {
        const newCategories = categories
            .map((category, index) => index === key ? newCategory : category);

        setCategories(newCategories);
    };

    const categoriesElements = categories
        .map((category, index) => {
            return (
                <TextField
                    variant='standard'
                    key={index}
                    onChange={(event) => editCategory(index, event.target.value)}
                    value={category}
                />
            );
        });

    return (
        <div style={styles.container}>
            {categoriesElements}
            <Button onClick={(_) => addCategory()} variant="contained">
                <FontAwesomeIcon icon={faAdd} />
            </Button>
        </div>
    );
};