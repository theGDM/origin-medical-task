import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import backgroundImageUrl from '../../assets/man-suit-is-holding-tablet-front-car-with-graph-it.jpg';
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { sign_in } from "../../services/api";
import { useDispatch } from "react-redux";
import { SetAdmin } from "../../actions/adminAction";
import { ToastContainer, toast } from 'react-toastify';
import { Audio, ColorRing, ThreeDots } from 'react-loader-spinner'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem("userEmail");
        if (!user) navigate("/");
        else navigate("/dashboard");
    }, []);

    const handleNavigation = () => {
        navigate('/register')
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoggedIn(true);
        let response = await sign_in(email, password);
        setLoggedIn(false);
        toast(response.message);

        if (response.message === 'User Exists!') {
            localStorage.setItem("userEmail", email);
            dispatch(SetAdmin(response.user.is_admin));
            localStorage.setItem('isAdmin', response.user.is_admin);
            navigate('/dashboard');
        }
    };

    return (
        <Box width='100vw' height='100vh' position='relative' sx={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: "cover", imageOrientation: 'landscape', }}>
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
                    <LockOutlinedIcon color={colors.greenAccent[500]} />
                </Avatar>
                <Typography component="h1" variant="h5" fontWeight='600' color={colors.greenAccent[500]}>
                    SIGN IN
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
                        sx={{ backgroundColor: colors.primary[400] }}
                        label={
                            <Typography
                                variant="h6" sx={{ color: colors.greenAccent[500] }}
                            >
                                Email Address
                            </Typography>
                        }
                        FormHelperTextProps={{
                            style: {
                                color: colors.greenAccent[500],
                                fontSize: '14px'
                            },
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                    <Box height='15px'></Box>
                    <TextField
                        id="filled-required"
                        fullWidth
                        defaultValue=""
                        type="password"
                        variant="filled"
                        sx={{ backgroundColor: colors.primary[400] }}
                        label={
                            <Typography
                                variant="h6" sx={{ color: colors.greenAccent[500] }}
                            >
                                Password
                            </Typography>
                        }
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                    />

                    {isLoggedIn == false ? <Button
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
                        Sign In
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
                    <Box >
                        <Typography variant="h7" color={colors.greenAccent[200]}>
                            Don't have an account?&nbsp;
                        </Typography>
                        <Typography variant="h7" fontWeight="600" color={colors.greenAccent[500]} sx={{ cursor: 'pointer' }} onClick={handleNavigation}>
                            Register
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
