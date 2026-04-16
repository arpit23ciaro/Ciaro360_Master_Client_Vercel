import { Box, capitalize, Tooltip, Typography } from "@mui/material";
import { colors } from "../Style/GlobalStyle";

export const TruncatedList = ({ data = [] }) => {
  const visibleItems = data?.slice(0, 2);
  const extraItems = data?.slice(2);

  if (!data?.length) return <span>N/A</span>;

  const truncate = (text) =>
    text?.length > 14 ? `${text.slice(0, 14)}..` : text;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
      {visibleItems?.map((item, index) => {
        const name = item?.name || "";
        const isTruncated = name?.length > 14;

        return (
          <Tooltip
            key={name + index}
            title={isTruncated ? name : ""}
            arrow
            disableHoverListener={!isTruncated}
          >
            <Box sx={{ textAlign: "start" }}>
              {capitalize(truncate(name))}
              {visibleItems?.length - 1 !== index && " ,"}
            </Box>
          </Tooltip>
        );
      })}

      {extraItems.length > 0 && (
        <Tooltip
          title={
            <Box>
              {extraItems.map((item, index) => (
                <Typography
                  key={item?.name + index}
                  variant="body2"
                  sx={{ fontFamily: "Poppins" }}
                >
                  {capitalize(item?.name || "")}
                  {extraItems.length - 1 !== index && " ,"}
                </Typography>
              ))}
            </Box>
          }
          arrow
        >
          <Typography
            variant="caption"
            sx={{
              cursor: "pointer",
              color: colors.bluishGreen,
              fontFamily: "Poppins",
            }}
          >
            +{extraItems.length} more
          </Typography>
        </Tooltip>
      )}
    </Box>
  );
};
