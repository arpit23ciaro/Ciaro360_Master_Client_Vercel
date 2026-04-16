// ToastProvider.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, IconButton, Slide, SnackbarContent } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers/icons";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

function SlideUp(props) {
  return <Slide {...props} direction="down" />;
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, severity = "success") => {
    const id = Date.now() + Math.random(); // ensure unique
    setToasts((prev) => [...prev, { id, message, severity }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const handleClose = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast, index) => (
        <Snackbar
          key={toast.id}
          open
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          TransitionComponent={SlideUp}
          style={{ top: 20 + index * 70 }} // spacing between toasts
        >
          <SnackbarContent
            style={{
              backgroundColor:
                toast.severity === "success" ? "#50a49f" : "#F55D5D",
              color: "white",
              fontFamily: "Poppins",
            }}
            message={toast.message}
            action={
              <IconButton size="small" onClick={() => handleClose(toast.id)}>
                <ClearIcon sx={{ color: "white" }} />
              </IconButton>
            }
          />
        </Snackbar>
      ))}
    </ToastContext.Provider>
  );
};
