import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    let adminData = useSelector((state) => state.admin);
    let isAdmin = localStorage.getItem('isAdmin');

    const handleLogOut = () => {
        localStorage.removeItem('userEmail');
        navigate('/');
    }

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
                <Box width='10px'></Box>
                <Button variant="outlined" color="secondary" onClick={handleLogOut}>
                    <Typography variant="h6" color={colors.greenAccent[400]}>
                        Log Out
                    </Typography>
                </Button>

            </Box> : <Box display='flex' flexDirection='row' alignItems='center' gap='10'>
                <Button variant="outlined" color="secondary" onClick={handleLogOut}>
                    <Typography variant="h6" color={colors.greenAccent[400]}>
                        Log Out
                    </Typography>
                </Button>

            </Box>}
        </Box >

    );
};

export default Header;
