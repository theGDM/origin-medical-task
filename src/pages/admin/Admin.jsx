import { Box } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header.jsx";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploadForm from "../../components/ImageUploadForm.jsx";
import LabelAddForm from "../../components/LabelAddForm.jsx";
import Labels from "../../components/Labels.jsx";


const Admin = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("userEmail");
        if (!user) navigate("/");
    }, []);

    return (
        <Box m="20px">
            <Header
                title="Admin Dashboard"
                subtitle="Dashboard for Admins"
            />

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 6"
                    gridRow="span 4"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position='relative'
                >
                    <Box width="100%" m="0 30px">
                        <ImageUploadForm />
                    </Box>
                </Box>
                <Box
                    gridColumn="span 6"
                    gridRow="span 4"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                >
                    <Box width="100%" m="0 30px">
                        <LabelAddForm />
                        <Labels />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Admin;
