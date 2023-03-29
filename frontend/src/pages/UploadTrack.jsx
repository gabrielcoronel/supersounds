import TrackForm from '../components/TrackForm';
import * as trackService from '../services/tracksService';

export default () => {
    return (
        <TrackForm
            submitText="Subir"
            onSubmit={(track) => trackService.add(track)}
            initialData={{
                title: "",
                audio: null,
                categories: []
            }}
        />
    );
};