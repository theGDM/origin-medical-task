import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { add_label } from "../services/api";
import { fetchLablesData } from "../actions/labelAction";
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from "react-loader-spinner";

export default function LabelAddForm() {
    const [labelName, setLabelName] = useState("");
    const [labelAdded, setLabelAdded] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLabelAdded(true);
        let data = await add_label(labelName);
        setLabelAdded(false);
        dispatch(fetchLablesData());
        toast(data.message);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: 'absolute',
                width: '500px',
                top: '10%',
                left: '50%',
                opacity: '0.95',
                transform: 'translateX(-50%)',
                backgroundColor: colors.primary[600],
                padding: "2rem",
                borderRadius: "0.5rem",
                boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.9)",
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: colors.greenAccent[500] }}>
                <AddCircleIcon color={colors.greenAccent[500]} />
            </Avatar>
            <Typography component="h1" variant="h5" fontWeight='600' color={colors.greenAccent[500]}>
                Add Label
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
                            Label Name
                        </Typography>
                    }
                    backgroundColor={colors.primary[400]}
                    FormHelperTextProps={{
                        style: {
                            color: colors.greenAccent[500],
                            fontSize: '14px'
                        },
                    }}
                    onChange={(e) => setLabelName(e.target.value)}
                    autoFocus
                />


                {labelAdded == false ? <Button
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
                    Add
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
