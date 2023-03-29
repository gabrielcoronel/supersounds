import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from '@reach/router';
import { TextField, Button, Chip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

import CategoriesField from "../components/CategoriesField";
import Heading from '../components/Heading';
import * as trackService from "../services/tracksService";
import { queryClient } from '../queryClient';

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "2rem"
    },
    list: {
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "3.5rem"
    },
    tile: {
        root: {
            width: "33%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: "2rem",
            padding: "1.5rem",
            border: "1px solid silver",
            borderRadius: "15px"
        },
        heading: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        buttons: {
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "1rem"
        },
        categories: {
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "0.5rem"
        },
        audioControls: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }
    }
};

const SearchForm = ({ search, setSearch, onSearch }) => {
    const updateTitle = (newTitle) => {
        setSearch({ ...search, title: newTitle });
    };

    const updateCategories = (newCategories) => {
        setSearch({ ...search, categories: newCategories });
    };

    return (
        <div style={styles.form}>
            <TextField
                label="Título"
                variant="standard"
                value={search.title}
                onChange={(event) => updateTitle(event.target.value)}
            />

            <CategoriesField
                categories={search.categories}
                setCategories={updateCategories}
            />

            <Button onClick={onSearch} variant="contained">
                Buscar
            </Button>
        </div>
    );
};

const CategoryChip = ({ category }) => {
    return (
        <Chip label={category} variant="filled" />
    );
};

const TrackTile = ({ track }) => {
    const { title, audioUri, categories } = track;
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
        <div style={styles.tile.root}>
            <div style={styles.tile.heading}>
                <span style={{ textOverflow: "ellipsis" }}>{title}</span>

                <div style={styles.tile.buttons}>
                    <Button onClick={(_) => mutation.mutate(id)} variant="contained">
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>

                    <Button onClick={async () => await navigate(`/edit/${id}`)} variant="contained">
                        <FontAwesomeIcon icon={faPencil} />
                    </Button>
                </div>
            </div>

            <div style={styles.tile.audioControls}>
                <audio src={audioUri} controls></audio>
            </div>

            <div style={styles.tile.categories}>
                {categoriesElements}
            </div>
        </div>
    );
};

const TracksList = ({ tracks }) => {
    const tracksElements = tracks
        .map((track) => <TrackTile key={track._id} track={track} />);

    return (
        <div style={styles.list}>
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
            <Heading text="Lista de pistas" />

            <SearchForm
                search={search}
                setSearch={setSearch}
                onSearch={handleSearch}
            />

            <TracksList tracks={data} />
        </div>
    );
};