import "./App.css";
import { Box } from "@mui/material";
import PublicRoutes from "./routes/public route/PublicRoutes";
import "@fontsource/poppins"; // Defaults to weight 400
import { useEffect } from "react";
import { ToastProvider } from "./context/ToastProvider";

function App() {
  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (e.message && e.message.startsWith("ResizeObserver loop")) {
        const overlay = document.getElementById(
          "webpack-dev-server-client-overlay",
        );
        const overlayDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div",
        );
        if (overlay) overlay.style.display = "none";
        if (overlayDiv) overlayDiv.style.display = "none";
      }
    });
  }, []);
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <ToastProvider>
        <PublicRoutes />
      </ToastProvider>
    </Box>
  );
}
export default App;
