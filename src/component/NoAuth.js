import React, { useEffect } from "react";
import { useContext } from "react";
import { fontSize, fontWeight, GlobleStyle, Item } from "../Style/GlobalStyle";
import { Box, styled, Grid, Typography } from "@mui/material";
import CustomeButton from "../component/CustomeButton";
import unAuthImage from "../assest/unAuth.jpg";
import ciaroLogo from "../assest/logo.png";
import { useNavigate } from "react-router";
import UserContext from "../context/UserContext";

const NotAuth = () => {
  const navigate = useNavigate();
  const { accessToken } = useContext(UserContext);
  useEffect(() => {
    // setInitialLoading(location?.state?.initialState);
    if (!accessToken) {
      navigate("/login", { replace: true });
    }
  }, [accessToken, navigate]);

  function handleClick() {
    navigate(-1);
  }

  return (
    <GlobleStyle>
      <ContainerStyle>
        <Box>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
              <Item className="grid-item-style">
                <Box>
                  <img src={ciaroLogo} alt="ciaroLogo" width={200} />
                </Box>

                <Box className="login-container">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      fontFamily: "poppins",
                    }}
                  >
                    <Typography className="welcome-text">
                      🚫 Unauthorized Access
                    </Typography>
                    <Typography sx={{ fontFamily: "Poppins" }}>
                      Oops! It looks like you don’t have permission to be here.
                    </Typography>
                  </Box>
                  <Box className="login-input-container">
                    <Box style={{ width: "100%" }}>
                      <Box style={{ width: "30%", margin: "auto" }}>
                        <CustomeButton label="Go Back" onClick={handleClick} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Item>
            </Grid>
            <Grid
              size={{ xs: 12, sm: 6, md: 6 }}
              className="img-main-containers"
            >
              <Item
                sx={{
                  backgroundColor: "initial",
                  padding: "0px",
                  marginTop: "0px",
                }}
              >
                <Box>
                  <img
                    src={unAuthImage}
                    alt="unAuthImage"
                    style={{ width: "80%", margin: "auto" }}
                  />
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </ContainerStyle>
    </GlobleStyle>
  );
};

export default NotAuth;

const ContainerStyle = styled(Box)({
  "& .or-text": {
    fontSize: fontSize.p,
    fontWeight: fontWeight.semibold,
  },
  "& .or-text-border": {
    borderBottom: "1px solid black",
    width: "40%",
  },
  "& .img-main-containers": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "cover",
  },
});
