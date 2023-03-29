import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

import CategoriesField from "../components/CategoriesField";
import * as trackService from "../services/tracksService";
import { queryClient } from '../queryClient';

const SearchForm = ({ search, setSearch, onSearch }) => {
    const updateTitle = (newTitle) => {
        setSearch({ ...search, title: newTitle });
    };

    const updateCategories = (newCategories) => {
        setSearch({ ...search, categories: newCategories });
    };

    return (
        <div>
            <label>
                Título

                <input
                    type="text"
                    value={search.title}
                    onChange={(event) => updateTitle(event.target.value)}
                />
            </label>

            <label>
                Categorías

                <CategoriesField
                    categories={search.categories}
                    setCategories={updateCategories}
                />
            </label>

            <button onClick={onSearch}>
                Buscar
            </button>
        </div>
    );
};

const CategoryChip = ({ category }) => {
    return (
        <span>{category}</span>
    );
};

const TrackTile = ({ track }) => {
    const { title, audio, categories } = track;
    const id = track._id;

    const mutation = useMutation((id) => trackService.removeOne(id));
    const navigate = useNavigate();

    const categoriesElements = categories
        .map((category, index) => <CategoryChip key={index} category={category} />);

    if (mutation.isError) {
        return "Error";
    }

    if (mutation.isLoading) {
        return "Loading";
    }

    if (mutation.isSuccess) {
        queryClient.invalidateQueries();
    }

    return (
        <div>
            <div>
                <span>{title}</span>

                <div>
                    <button onClick={(_) => mutation.mutate(id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>

                    <button onClick={async () => await navigate(`/edit/${id}`)}>
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                </div>
            </div>

            <div>
                <audio src={audio}></audio>
            </div>

            <div>
                {categoriesElements}
            </div>
        </div>
    );
};

const TracksList = ({ tracks }) => {
    const tracksElements = tracks
        .map((track) => <TrackTile key={track._id} track={track} />);

    return (
        <div>
            {tracksElements}
        </div>
    );
};

export default () => {
    const [search, setSearch] = useState({
        title: "",
        categories: [],
    });

    const queryKey = "filteredTracks";

    const { data, isError, isLoading } = useQuery(
        queryKey,
        () => trackService.filter(search.title, search.categories),
        // {
        //     initialData: () => trackService.getAll()
        // }
    );

    const handleSearch = () => {
        queryClient.invalidateQueries(queryKey);
    };

    if (isError) {
        return "Error";
    }

    if (isLoading) {
        return "Loading"
    }

    return (
        <div>
            <SearchForm
                search={search}
                setSearch={setSearch}
                onSearch={handleSearch}
            />

            <TracksList tracks={data} />
        </div>
    );
};