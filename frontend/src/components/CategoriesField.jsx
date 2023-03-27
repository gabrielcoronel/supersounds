import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

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
                <input
                    key={index}
                    onChange={(event) => editCategory(index, event.target.value)}
                    type="text"
                    value={category}
                />
            );
        });

    return (
        <div>
            {categoriesElements}
            <button onClick={(_) => addCategory()}>
                <FontAwesomeIcon icon={faAdd} />
            </button>
        </div>
    );
};