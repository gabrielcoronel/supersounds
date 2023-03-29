import { useParams } from "@reach/router";
import { useQuery } from "react-query";

import * as trackService from "../services/tracksService";
import TrackForm from "../components/TrackForm";
import Heading from '../components/Heading';

export default () => {
    const params = useParams();
    const id = params.id;

    const { data, isError, isLoading } = useQuery(
        ["track", id],
        () => trackService.getById(id)
    );

    if (isError) {
        return "Error";
    }

    if (isLoading) {
        return "Loading";
    }

    console.log("Sii");
    console.log(data);

    return (
        <>
            <Heading text="Edita una pista" />

            <TrackForm
                submitText="Guardar cambios"
                onSubmit={(track) => trackService.updateOne(id, track)}
                initialData={data}
            />
        </>
    );
};