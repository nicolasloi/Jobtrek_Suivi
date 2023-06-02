import {Button, Typography, useTheme} from "@mui/material";
import {tokens} from "../theme";

const CustomButton = ({nom}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Button
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "10px 19px",
                width: "115px",
                height: "45px",
                background: "#8FC62E",
                boxShadow:
                    "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
                flex: "none",
                order: 1,
                flexGrow: 0,
                "&:hover": {
                    background: colors.greenAccent[300],
                },
            }}
        >
            <Typography variant="body1"
                        sx={{
                            fontWeight: 800,
                            fontSize: "14px",
                            lineHeight: "20px",
                            color: "#FFFFFF",

                        }}>
                {nom}
            </Typography>
        </Button>
    );
};

export default CustomButton;
