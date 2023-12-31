import { Box, Button, InputLabel, MenuItem, Select } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header.jsx";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { delete_image, get_all_images, update_image } from "../../services/api.js";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchLablesData } from "../../actions/labelAction.js";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    let adminData = useSelector((state) => state.admin);
    let [images, setImages] = useState([]);
    let [tempImages, setTempImages] = useState([]);
    let isAdmin = localStorage.getItem('isAdmin');
    let [selectedPage, setSelectedPage] = useState(0);
    let [pageCount, setPageCount] = useState(1);
    let [paginationArray, setPaginationArray] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const labelsData = useSelector((state) => state.label);
    const sortData = useSelector((state) => state.sort);
    const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem("userEmail");
        if (!user) navigate("/");

        (async () => {
            let response = await get_all_images();
            setImages(response.data.labelsData.slice(0, 8));
            setTempImages(response.data.labelsData);

            // let tempPagesCount = Math.ceil(response.data.labelsData.length / 8);
            // console.log(tempPagesCount);
            // let tempPaginationArray = Array.from({ length: tempPagesCount }, (_, index) => (
            //     selectedPage != index ? <Box
            //         width='40px'
            //         height='20px'
            //         backgroundColor={colors.primary[400]}
            //         ml='5px'
            //         display='flex'
            //         justifyContent='center'
            //         alignItems='center'
            //         borderRadius='4px'
            //         sx={{
            //             "&:hover": {
            //                 backgroundColor: colors.greenAccent[600], // Set your desired hover color
            //             },
            //             cursor: 'pointer'
            //         }}
            //         onClick={() => handlePageClick(index)}
            //     >
            //         {index + 1}
            //     </Box> : <Box width='40px'
            //         height='20px'
            //         backgroundColor={colors.greenAccent[600]}
            //         ml='5px'
            //         color={colors.primary[400]}
            //         display='flex'
            //         justifyContent='center'
            //         alignItems='center'
            //         borderRadius='4px'
            //         sx={{ cursor: 'pointer' }}
            //         onClick={() => handlePageClick(index)}
            //     >
            //         {index + 1}
            //     </Box>
            // ));
            // console.log(tempPaginationArray);
            // setPaginationArray(tempPaginationArray);
        })();

        dispatch(fetchLablesData());
    }, []);

    useEffect(() => {
        console.log(sortData.sortArray);
        let tImages = [...tempImages];
        if (sortData.sortArray.length != 0) {
            let filterImages = tImages.filter((image) => sortData.sortArray.every(label => image.labels.includes(label)));
            setImages(filterImages);
        } else {
            setImages(tempImages);
        }
    }, [sortData.sortArray]);

    const handleDelete = async (imageId, imageTitle, deleteImage) => {
        let updatedImages = images.filter(image => image.image_id != deleteImage.image_id);
        setImages(updatedImages);
        await delete_image(imageId, imageTitle);
    }

    const handlePageClick = (pageIndex) => {
        console.log(pageIndex);
        console.log(tempImages);
        console.log(`range : ${pageIndex * 8} : ${pageIndex * 8 + 8}`);
        console.log(tempImages);
        let newImages = tempImages.slice(pageIndex * 8, pageIndex * 8 + 8);
        setImages(newImages);
    }

    const handleDeleteLabel = async (imageId, imageTitle, deleteLabel, image, index) => {
        setSelectedPage(index);
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
            <Box m="20px 0 20px 0" display='flex' flexDirection='row'>
                {paginationArray}
            </Box>
            <Box
                display='flex'
                flexDirection='row'
                flexWrap='wrap'
                justifyContent='space-between'
            >
                {images.map((image, index) => (
                    <Card sx={{ backgroundColor: colors.primary[500], width: 345, m: "20px 0 0 0" }}>
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

                            sx={{ objectFit: 'cover' }}
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
