import { Box, capitalize, Tooltip } from "@mui/material";
import { useRef, useState, useEffect } from "react";

const EllipsisText = ({ text, maxWidth }) => {
  const textRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsOverflow(el.scrollWidth > el.clientWidth);
    }
  }, [text]);

  const content = (
    <Box
      ref={textRef}
      sx={{
        maxWidth,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {capitalize(text || "")}
    </Box>
  );

  return isOverflow ? (
    <Tooltip title={capitalize(text || "")} arrow>
      {content}
    </Tooltip>
  ) : (
    content
  );
};

export default EllipsisText;
