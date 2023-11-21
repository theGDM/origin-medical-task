import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { tokens } from "../theme";
import { Select, useTheme } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { upload_image } from "../services/api";
import { ToastContainer, toast } from 'react-toastify';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { ThreeDots } from "react-loader-spinner";

AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: 'us-east-1',
});

// Load environment variables
dotenv.config();

const s3 = new AWS.S3();

export default function ImageUploadForm() {
    const [imageTitle, setImageTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedValues, setSelectedValues] = useState([]);
    const [isUploaded, setUploaded] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const labelsData = useSelector((state) => state.label);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setSelectedFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(imageTitle);
        console.log(selectedValues);

        const s3Key = `uploads/${selectedFile.name}`;

        // Upload the file to S3
        setUploaded(true)
        s3.upload({
            Bucket: 'image-container45',
            Key: s3Key,
            Body: selectedFile,
            ContentType: selectedFile.type,
        }, (err, data) => {
            if (err) {
                console.error('Error uploading file to S3:', err);
                toast('Error uploading file to S3!');
            } else {
                console.log('File uploaded successfully:', data);
            }
        });


        await upload_image(imageTitle, selectedValues, selectedFile.name);
        setUploaded(false);
        toast('File Uploaded Successfully!');
    };

    const handleChange = (event) => {
        setSelectedValues(event.target.value);
        console.log(selectedValues)
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: 'absolute',
                width: '400px',
                top: '50%',
                left: '50%',
                opacity: '0.95',
                transform: 'translate(-50%, -50%)',
                backgroundColor: colors.primary[600],
                padding: "3rem",
                borderRadius: "0.5rem",
                boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.9)",
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: colors.greenAccent[500] }}>
                <FileUploadIcon color={colors.greenAccent[500]} />
            </Avatar>
            <Typography component="h1" variant="h5" fontWeight='600' color={colors.greenAccent[500]}>
                Image Upload
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    id="filled-required"
                    fullWidth
                    defaultValue=""
                    type="text"
                    variant="filled"
                    label={
                        <Typography
                            variant="h6" sx={{ color: colors.greenAccent[500] }}
                        >
                            Image Title
                        </Typography>
                    }
                    backgroundColor={colors.primary[400]}
                    FormHelperTextProps={{
                        style: {
                            color: colors.greenAccent[500],
                            fontSize: '14px'
                        },
                    }}
                    onChange={(e) => setImageTitle(e.target.value)}
                    autoFocus
                />
                <Box height='15px'></Box>
                <Select
                    labelId="select-multiple-label"
                    id="select-multiple"
                    multiple
                    fullWidth
                    value={selectedValues}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(', ')}
                    label={
                        <Typography
                            variant="h5" sx={{ color: colors.greenAccent[500] }}
                        >
                            Labels
                        </Typography>
                    }
                    defaultValue="Select"
                    variant="filled"
                    backgroundColor={colors.primary[400]}
                    FormHelperTextProps={{
                        style: {
                            color: colors.greenAccent[500],
                            fontSize: '14px'
                        },
                    }}

                >
                    {labelsData?.labels?.map((label) => (
                        <MenuItem key={label.label_id} value={label.label_name}>
                            <Typography variant="h6" sx={{ color: colors.greenAccent[500] }} >
                                {label.label_name}
                            </Typography>
                        </MenuItem>
                    ))}

                </ Select >

                <TextField
                    type="file"
                    onChange={handleFileChange}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    label={
                        <Typography
                            variant="h5" sx={{ color: colors.greenAccent[500] }}
                        >
                            File Upload
                        </Typography>
                    }
                    backgroundColor={colors.primary[400]}
                    FormHelperTextProps={{
                        style: {
                            color: colors.greenAccent[500],
                            fontSize: '14px'
                        },
                    }}
                />
                {isUploaded == false ? <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        backgroundColor: colors.greenAccent[500],
                        "&:hover": {
                            backgroundColor: colors.greenAccent[600], // Set your desired hover color
                        },
                    }}

                >
                    Upload
                </Button> : <Box display='flex' justifyContent='center' alignItems='center'>
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color={colors.greenAccent[600]}
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                </Box>}
            </Box>
        </Box>
    );
}
