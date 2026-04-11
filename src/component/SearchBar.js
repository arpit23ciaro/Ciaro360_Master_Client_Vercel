import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material";

export default function SearchBar({className, placeholder, onChange}) {
  return (
        <OutlinedInput
          className={className}
          style={{height:'2.5rem',
          width:'77%',
           marginLeft:'2%', borderRadius:'12px', boxShadow:'0px 6px 18px -12px rgba(0, 0, 0.5)' }}
          id="outlined-adornment-amount"
          startAdornment={
            <InputAdornment position="start"   >
              <SearchIcon />
            </InputAdornment>
          }
          placeholder={placeholder}
          onChange={onChange}
          autoComplete="off"
        />
  );
}
