import { get_all_labels } from "../services/api";

export const LabelsRequest = () => ({
    type: 'FETCH_LABELS_REQUEST',
});

export const LabelsSuccess = (data) => ({
    type: 'FETCH_LABELS_SUCCESS',
    payload: data,
});

export const LabelsFailure = (data) => ({
    type: 'FETCH_LABELS_FAILURE',
    payload: data,
});

export const SetLabelsDetails = (data) => ({
    type: 'SET_LABELS_DETAILS',
    payload: data,
});


export const fetchLablesData = () => {
    return async (dispatch) => {
        try {
            let data_retries = 1;
            dispatch(LabelsSuccess([]));
            while (data_retries < 4) {
                dispatch(LabelsRequest());
                await get_all_labels()
                    .then((response) => {
                        console.log(response.data.labelsData);

                        const lablesData = response.data.labelsData;
                        if (lablesData === null) {
                            dispatch(LabelsSuccess([]));
                        } else {
                            dispatch(LabelsSuccess(lablesData));
                        }
                        data_retries = 4;
                    })
                    .catch((err) => {
                        data_retries++;
                    });
            }
        } catch (err) {
            dispatch(LabelsFailure(err));
        }
    };
};

