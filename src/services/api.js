import axios from 'axios';

const stage = 'prod';
const originMedicalServiceURL = `https://ha3wtaz0qa.execute-api.us-east-1.amazonaws.com/${stage}`;

export const Logging = async (postdata) => {
    try {
        return await axios.post(`${originMedicalServiceURL}/logging`, postdata);
    } catch (error) {
    }
};

export const add_user = async (user_name, user_email, password) => {
    try {
        let response = await axios.post(`${originMedicalServiceURL}/user_details`, {
            user_name: user_name,
            user_email: user_email,
            password: password
        });

        let payload = {
            a_info: `User is added successfully`,
            user_name: user_name,
            user_email: user_email,
            password: password,
            status: 'true',
        };

        Logging({ payload, severity: 'INFO' });

        return response.data;
    } catch (err) {
        console.log(err);

        let payload = {
            a_info: `User is added successfully`,
            user_name: user_name,
            user_email: user_email,
            password: password,
            status: 'false',
        };

        Logging({ payload, severity: 'ERROR' });
    }
}

export const sign_in = async (user_email, password) => {
    try {
        let response = await axios.post(`${originMedicalServiceURL}/user_exists`, {
            user_email: user_email,
            password: password
        });

        let payload = {
            a_info: `User is logged in successfully`,
            user_email: user_email,
            password: password,
            status: 'true',
        };

        Logging({ payload, severity: 'INFO' });

        return response.data;
    } catch (err) {
        console.log(err);

        let payload = {
            a_info: `User is logged in successfully`,
            user_email: user_email,
            password: password,
            status: 'false',
        };

        Logging({ payload, severity: 'ERROR' });
    }
}

export const get_all_labels = async () => {
    try {
        let response = await axios.get(`${originMedicalServiceURL}/labels`);

        let payload = {
            a_info: `fetch all the labels`,
            labels: response.data.labelsData,
            status: 'true',
        };

        Logging({ payload, severity: 'INFO' });

        return response;
    } catch (err) {
        console.log(err);

        let payload = {
            a_info: `fetch all the labels`,
            labels: err.toString(),
            status: 'false',
        };

        Logging({ payload, severity: 'ERROR' });
    }
}

export const add_label = async (lableName) => {
    try {
        let response = await axios.post(`${originMedicalServiceURL}/labels`, {
            label_name: lableName
        });

        let payload = {
            a_info: `label added successfully`,
            response: response.data.labelsData,
            status: 'true',
        };

        Logging({ payload, severity: 'INFO' });

        return response.data;
    } catch (err) {
        console.log(err);

        let payload = {
            a_info: `label added successfully`,
            response: err.toString(),
            status: 'false',
        };

        Logging({ payload, severity: 'ERROR' });
    }
}

export const delete_label = async (lableId, lableName) => {
    try {
        await axios.delete(`${originMedicalServiceURL}/labels`, {
            params: {
                label_id: lableId,
                label_name: lableName,
            }
        });


        let payload = {
            a_info: `label deleted successfully`,
            label_id: lableId,
            label_name: lableName,
            status: 'true',
        };

        Logging({ payload, severity: 'INFO' });
    } catch (err) {
        console.log(err);

        let payload = {
            a_info: `label deleted successfully`,
            label_id: lableId,
            label_name: lableName,
            status: 'false',
        };

        Logging({ payload, severity: 'ERROR' });
    }
}

export const upload_image = async (image_title, labels, file_name) => {
    try {
        await axios.post(`${originMedicalServiceURL}/images`, {
            image_title: image_title,
            labels: labels,
            file_name: file_name
        });

        let payload = {
            a_info: `Image uploaded successfully`,
            image_title: image_title,
            labels: labels,
            file_name: file_name,
            status: 'true',
        };

        Logging({ payload, severity: 'INFO' });
    } catch (err) {
        console.log(err);

        let payload = {
            a_info: `Image uploaded successfully`,
            image_title: image_title,
            labels: labels,
            file_name: file_name,
            status: 'false',
        };

        Logging({ payload, severity: 'ERROR' });
    }
}

export const get_all_images = async () => {
    try {
        let response = await axios.get(`${originMedicalServiceURL}/images`);

        let payload = {
            a_info: `Get all the images`,
            images: response.data.labelsData,
            status: 'true',
        };

        Logging({ payload, severity: 'INFO' });

        return response;
    } catch (err) {
        console.log(err);

        let payload = {
            a_info: `Get all the images`,
            labels: err.toString(),
            status: 'false',
        };

        Logging({ payload, severity: 'ERROR' });
    }
}

export const delete_image = async (image_id, image_title) => {
    try {
        await axios.delete(`${originMedicalServiceURL}/images`, {
            params: {
                image_id: image_id,
                image_title: image_title,
            }
        });


        let payload = {
            a_info: `Image deleted successfully`,
            image_id: image_id,
            image_title: image_title,
            status: 'true',
        };

        Logging({ payload, severity: 'INFO' });
    } catch (err) {
        console.log(err);

        let payload = {
            a_info: `Image deleted successfully`,
            image_id: image_id,
            image_title: image_title,
            status: 'false',
        };

        Logging({ payload, severity: 'ERROR' });
    }
}


export const update_image = async (image_id, image_title, labels) => {
    try {
        await axios.patch(`${originMedicalServiceURL}/images`, {
            labels: labels
        }, {
            params: {
                image_id: image_id,
                image_title: image_title,
            }
        });


        let payload = {
            a_info: `Image updated successfully`,
            image_id: image_id,
            image_title: image_title,
            status: 'true',
        };

        Logging({ payload, severity: 'INFO' });
    } catch (err) {
        console.log(err);

        let payload = {
            a_info: `Image updated successfully`,
            image_id: image_id,
            image_title: image_title,
            status: 'false',
        };

        Logging({ payload, severity: 'ERROR' });
    }
}

