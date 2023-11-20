import { Box, Button, InputLabel, MenuItem, Select } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header.jsx";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { delete_image, get_all_images, update_image } from "../../services/api.js";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';


const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    let adminData = useSelector((state) => state.admin);
    let [images, setImages] = useState([]);
    let isAdmin = localStorage.getItem('isAdmin');
    const [selectedValues, setSelectedValues] = useState([]);
    const labelsData = useSelector((state) => state.label);

    useEffect(() => {
        const user = localStorage.getItem("userEmail");
        if (!user) navigate("/");
        console.log(adminData.isAdmin);

        (async () => {
            let response = await get_all_images();
            setImages(response.data.labelsData);
        })();
    }, []);

    const handleDelete = async (imageId, imageTitle, deleteImage) => {
        let updatedImages = images.filter(image => image.image_id != deleteImage.image_id);
        setImages(updatedImages);
        await delete_image(imageId, imageTitle);
    }

    const handleDeleteLabel = async (imageId, imageTitle, deleteLabel, image, index) => {
        console.log(index);
        let updatedLabels = image.labels.filter(label => label != deleteLabel);
        await update_image(imageId, imageTitle, updatedLabels);
        image.labels = updatedLabels;
        console.log(image);
        images[index] = image;
        let updatedImages = [...images];
        setImages(updatedImages);
    }

    const updateLabels = async (imageId, imageTitle, labels, image, index) => {
        let updatedLabels = [...selectedValues, ...labels];
        console.log(updatedLabels);
        await update_image(imageId, imageTitle, updatedLabels);
        image.labels = updatedLabels;
        console.log(image);
        images[index] = image;
        let updatedImages = [...images];
        setImages(updatedImages);
        setSelectedValues([]);
    }

    const handleChange = (event) => {
        setSelectedValues(event.target.value);
        console.log(selectedValues)
    };

    return (
        <Box m="20px">
            <Header
                title="Main Dashboard"
                subtitle="Dashboard for Users"
            />
            <Box
                m="40px 0 0 0"
                display='flex'
                flexDirection='row'
                flexWrap='wrap'
                justifyContent='space-between'
            >
                {images.map((image, index) => (
                    <Card sx={{ backgroundColor: colors.primary[500], maxWidth: 345 }}>
                        {isAdmin == 'true' ? <CardHeader
                            action={
                                <IconButton aria-label="settings" onClick={() => handleDelete(image.image_id, image.image_title, image)} >
                                    <DeleteIcon />
                                </IconButton>
                            }
                            title={image.image_title}
                        /> : <></>}
                        <CardMedia
                            component="img"
                            height="194"
                            image={image.image_url}
                            alt="image"
                        />
                        <CardActions>
                            <Box display='flex' flexDirection='row' flexWrap='wrap'>
                                {image.labels.map(label => (
                                    <Box backgroundColor={colors.primary[600]} p='4px 4px' m='4px' display='flex' flexDirection='row' borderRadius='4px'>
                                        <Typography variant="h6" sx={{ color: colors.greenAccent[500] }} >
                                            {label}
                                        </Typography>
                                        <DeleteIcon color='red' sx={{ cursor: "pointer" }} onClick={() => handleDeleteLabel(image.image_id, image.image_title, label, image, index)} />
                                    </Box>
                                ))}
                            </Box>
                        </CardActions>
                        <Box p='4px'>
                            <InputLabel id="select-multiple-label" sx={{ color: colors.greenAccent[500] }}>Add Labels</InputLabel>
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
                                {labelsData?.labels?.filter((label) => !image.labels.includes(label.label_name)).map((label) => (
                                    <MenuItem key={label.label_id} value={label.label_name}>
                                        <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>
                                            {label.label_name}
                                        </Typography>
                                    </MenuItem>
                                ))}

                            </ Select >
                            <Button
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
                                onClick={() => updateLabels(image.image_id, image.image_title, image.labels, image, index)}
                            >
                                SAVE
                            </Button>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Dashboard;
