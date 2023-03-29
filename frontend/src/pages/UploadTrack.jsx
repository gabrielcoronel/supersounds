import TrackForm from '../components/TrackForm';
import Heading from '../components/Heading';
import * as trackService from '../services/tracksService';

export default () => {
    return (
        <>
            <Heading text="Sube una pista" />

            <TrackForm
                submitText="Subir"
                onSubmit={(track) => trackService.add(track)}
                initialData={{
                    title: "",
                    audio: null,
                    categories: []
                }}
            />
        </>
    );
};