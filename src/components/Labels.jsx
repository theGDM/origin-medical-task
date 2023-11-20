import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { delete_label, get_all_labels } from "../services/api";
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchLablesData } from "../actions/labelAction";

export default function Labels() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const labelsData = useSelector((state) => state.label);

    useEffect(() => {
        dispatch(fetchLablesData());
    }, []);

    const handleDelete = async (labelId, labelName) => {
        await delete_label(labelId, labelName);
        dispatch(fetchLablesData());
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: 'wrap',
                position: 'absolute',
                width: '500px',
                bottom: '10%',
                left: '50%',
                opacity: '0.95',
                transform: 'translateX(-50%)',
                backgroundColor: colors.primary[600],
                padding: "2rem",
                borderRadius: "0.5rem",
                boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.9)",
            }}
        >
            {labelsData.labels?.map((label) => (
                <Box backgroundColor={colors.primary[400]} p='4px 4px' m='4px' display='flex' flexDirection='row' borderRadius='4px'>
                    <Typography variant="h6" sx={{ color: colors.greenAccent[500] }} >
                        {label.label_name}
                    </Typography>
                    <DeleteIcon color='red' sx={{ cursor: "pointer" }} onClick={() => handleDelete(label.label_id, label.label_name)} />
                </Box>
            ))}
        </Box>
    );
}
