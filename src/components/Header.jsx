import { Typography, Box, useTheme, Button, Select, MenuItem, InputLabel } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { SetSortLabels } from "../actions/labelsSortAction";

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [selectedValues, setSelectedValues] = useState([]);
    let adminData = useSelector((state) => state.admin);
    let isAdmin = localStorage.getItem('isAdmin');
    const labelsData = useSelector((state) => state.label);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        localStorage.removeItem('userEmail');
        navigate('/');
    }

    const handleChange = (event) => {
        setSelectedValues(event.target.value);
        dispatch(SetSortLabels(event.target.value));
    };

    return (
        <Box width="100%" display='flex' flexDirection='row' justifyContent='space-between' mb="30px">
            <Box >
                <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "0 0 5px 0" }}
                >
                    {title}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[400]}>
                    {subtitle}
                </Typography>
            </Box>
            <Box display='flex' flexDirection='row' alignItems='end' gap='10'>
                {title === 'Main Dashboard' ? <Box display='flex' flexDirection='column' justifyContent='start' gap='10'>
                    <InputLabel id="select-multiple-label" sx={{ color: colors.greenAccent[500] }}>Sort By Labels</InputLabel>
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
                        sx={{ width: '120px', height: '38px' }}
                        defaultValue="Select"
                        variant="filled"
                        // backgroundColor={colors.primary[400]}
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
                </Box> : <></>}
                <Box width='10px'></Box>
                {isAdmin === 'true' ? <Box display='flex' flexDirection='row' alignItems='center' gap='10'>
                    {title === 'Main Dashboard' ? <Button variant="contained" color="secondary" onClick={() => navigate('/admin')}>
                        <Typography variant="h6" color={colors.primary[400]}>
                            Admin Dashboard
                        </Typography>

                    </Button> : <Button variant="contained" color="secondary" onClick={() => navigate('/dashboard')}>
                        <Typography variant="h6" color={colors.primary[400]}>
                            Main Dashboard
                        </Typography>
                    </Button>}
                </Box> : <></>}
                <Box width='10px'></Box>
                <Box display='flex' flexDirection='row' alignItems='center' gap='10'>
                    <Button variant="outlined" color="secondary" onClick={handleLogOut}>
                        <Typography variant="h6" color={colors.greenAccent[400]}>
                            Log Out
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Box >

    );
};

export default Header;
