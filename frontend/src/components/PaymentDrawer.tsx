// In SwipeableEdgeDrawer.tsx
import React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Avatar } from "@mui/material";
import PhonePayLogo from "../assets/phone-pay.png"

const drawerBleeding = 0;

const Root = styled("div")(({ theme }) => ({
    height: "100%",
}));

const StyledBox = styled("div")(({ theme }) => ({
    backgroundColor: "#fff",
}));

interface Props {
    open: boolean;
    onClose: () => void;
}

const handlePayment =() => {
    
}

const PaymentDrawer: React.FC<Props> = ({ open, onClose }) => {
    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `calc(12% - ${drawerBleeding}px)`,
                        overflow: "visible",
                    },
                }}

            />
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={onClose}
                onOpen={() => { }}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{ keepMounted: true }}
            >
                <StyledBox
                    sx={{
                        position: "absolute",
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: "visible",
                        right: 0,
                        left: 0,
                    }}
                >
                </StyledBox>
                <StyledBox sx={{ height: "100%", overflow: "auto", p: 2 }}>
                    <Button onClick={handlePayment}>
                        <Avatar variant="rounded" src={PhonePayLogo} />
                    </Button>
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
};

export default PaymentDrawer;
