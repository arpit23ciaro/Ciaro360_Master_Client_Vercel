import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { CustomeDataGrid, GlobleStyle } from "../../Style/GlobalStyle";
import CustomeLinearProgress from "../../component/CustomeLinearProgress";
import addPolicy from "../../assest/add-policy.svg";
import AddOrganizationModal from "./AddOrganizationModal";

const OrganizationManagement = () => {
  const [loading, setLoading] = useState(false);
  const [orgModalOpen, setOrgModalOpen] = useState(false);

  const columns = [
    {
      field: "Organization Name",
      headerName: "Organization Name",
      headerAlign: "start",
      flex: 1.5,
      width: "30%",
      align: "center",
      renderCell: (params) => (
        <Box className="">
          {!params?.row?.editable && (
            <span
              //   onClick={() => handleRowClicked(params?.row?._id)}
              className="table-row-hover"
            >
              {capitalizeFirstLetter(params?.row?.evidenceId)}
            </span>
          )}
        </Box>
      ),
    },
    {
      field: "Super Admin Email",
      headerName: "Super Admin Email",
      flex: 3,
      width: "30%",
      align: "start",
      headerAlign: "start",
      renderCell: (params) => (
        <Box className="">
          {!params?.row?.editable && (
            <span
              //   onClick={() => handleRowClicked(params?.row?._id)}
              className="table-row-hover"
            >
              {params?.row?.category ? params?.row?.category.name : "N/A"}
            </span>
          )}
        </Box>
      ),
    },
    {
      field: "Location",
      headerName: "Location",
      flex: 3,
      width: "30%",
      align: "start",
      headerAlign: "start",
      renderCell: (params) => (
        <Box className="">
          {!params?.row?.editable && (
            <span
              //   onClick={() => handleRowClicked(params?.row?._id)}
              className="table-row-hover"
            >
              {params?.row?.custom === false ? "Default" : "Custom"}
            </span>
          )}
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Employee Size",
      flex: 3,
      width: "30%",
      align: "start",
      headerAlign: "start",
      renderCell: (params) => (
        <Box className="title-style">
          {!params?.row?.editable && (
            <Box>
              <span
                // onClick={() => handleRowClicked(params?.row?._id)}
                className="table-row-hover"
              >
                {capitalizeFirstLetter(params?.row?.name)}
              </span>
            </Box>
          )}
        </Box>
      ),
    },
    {
      field: "Subscribe Frameworks",
      headerName: "Subscribe Frameworks",
      flex: 2,
      width: "20%",
      headerAlign: "start",
      align: "center",

      renderCell: (params) => (
        <Box className="title-style">
          {!params?.row?.editable && (
            <Box>
              <span
                // onClick={() => handleRowClicked(params?.row?._id)}
                className="table-row-hover"
              >
                {capitalizeFirstLetter(params?.row?.name)}
              </span>
            </Box>
          )}
        </Box>
      ),
    },
    {
      field: "Onboarding Date",
      headerName: "Onboarding Date",
      flex: 2.5,
      headerAlign: "start",
      renderCell: (params) => (
        <Box className="">
          {!params?.row?.editable && (
            <span
              //   onClick={() => handleRowClicked(params?.row?._id)}
              className="table-row-hover"
            >
              {capitalizeFirstLetter(params?.row?.status)}
            </span>
          )}
        </Box>
      ),
    },
    {
      field: "frameworks",
      headerName:"Contract Details",
      headerClassName: "Contract Details",
      flex: 3,
      headerAlign: "start",
      renderCell: (params) => (
        <Box
          className="title-style"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {!params?.row?.editable && params?.row?.frameworks?.length > 0 ? (
            params?.row?.frameworks?.map((fwName, index) => (
              <span
                key={index}
                style={{ marginBottom: "4px" }}
                // onClick={() => handleRowClicked(params?.row?._id)}
                className="table-row-hover"
              >
                {capitalizeFirstLetter(fwName?.name)}
              </span>
            ))
          ) : (
            <span>N/A</span>
          )}
        </Box>
      ),
    },
  ];

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <GlobleStyle>
      <Box className="parent-container">
        <Box className="policies-container">
          <Typography className="policies-text">
            Orgnization Management
          </Typography>

          <Button className="create-policy" onClick={()=>setOrgModalOpen(true)}>
            <Box className="create-policy-label">
              <img src={addPolicy} alt="icon" className="add-svg-icon" />
              Add Organization
            </Box>
          </Button>
        </Box>
        <CustomeDataGrid
          rows={[]}
          columns={columns}
          loading={loading}
          disableColumnSorting
          disableColumnMenu
          hideFooterSelectedRowCount
          slots={{
            loadingOverlay: () => <CustomeLinearProgress />,
          }}
          pageSize={5}
          getRowHeight={() => "auto"}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5]}
          disableColumnFilter
          //   onRowSelectionModelChange={(newSelect) => {
          //     handleSelectedRow(newSelect);
          //   }}
          sx={{
            "& .MuiDataGrid-row": {
              minHeight: "100px !important",
              maxHeight: "auto !important",
            },
          }}
        />

        {orgModalOpen ? (
          <AddOrganizationModal
            open={orgModalOpen}
            onClose={() => setOrgModalOpen(false)}
            refreshList={() => {}}
          />
        ) : null}
      </Box>
    </GlobleStyle>
  );
};

export default OrganizationManagement;
