import {
  Box,
  Button,
  capitalize,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  colors,
  CustomeDataGrid,
  fontSize,
  GlobleStyle,
} from "../../Style/GlobalStyle";
import CustomeLinearProgress from "../../component/CustomeLinearProgress";
import addPolicy from "../../assest/add-policy.svg";
import AddUserModal from "./AddUserModal";
import SearchBar from "../../component/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import { GetUsers } from "../../services/user/GetUsers";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteModal from "../../component/DeleteModal";
import { useToast } from "../../context/ToastProvider";
import { UpdateUserStatus } from "../../services/user/UpdateUserStatus";
import UpdateUserStatusModal from "../../component/UpdateUserStatusModal";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";
import CustomButton from "../../component/CustomeButton";
import { usePersistedFilter } from "../../hooks/usePersistedFilter";
import filter from "../../assest/filter.svg";
import { GetUserRoleList } from "../../services/user/GetUserRoleList";

const UserManagement = ({ hasFullAccess, canEdit }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [roleList, setRoleList] = useState([]);
  // const [users, setUsers] = useState(false);
  const [originalUsers, setOriginalUsers] = useState(false);
  const [orgModalOpen, setOrgModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [updateStatusModal, setUpdateStatusModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [menuState, setMenuState] = useState({ anchorEl: null, rowId: null });

  const handleMenuOpen = (event, rowId) => {
    setMenuState({ anchorEl: event.currentTarget, rowId });
  };

  const handleMenuClose = () => {
    setMenuState({ anchorEl: null, rowId: null });
  };

  const handleEditClick = (row) => {
    handleMenuClose();
    setSelectedUser(row);
    setEditUserModal(true);
  };

  const handleDeleteClick = (row) => {
    handleMenuClose();
    setSelectedUser(row);
    setDeleteUserModal(true);
  };

  const handleStatusClick = (row) => {
    handleMenuClose();
    setSelectedUser(row);
    setUpdateStatusModal(true);
  };

  const columns = [
    {
      field: "username",
      headerName: "Name",
      headerAlign: "start",
      flex: 1.5,
      width: "30%",
      align: "center",
      renderCell: (params) => (
        <Box className="title-style title-start">
          <Typography className="datagrid-column-title">
            {capitalize(params.row.firstname || "") +
              " " +
              capitalize(params?.row?.lastname || "")}
          </Typography>
          <Typography className="sub-text">{params?.row.email}</Typography>
        </Box>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      width: "20%",
      headerAlign: "start",
      align: "center",

      renderCell: (params) => (
        <Box className="title-style">
          {!params?.row?.editable && (
            <Box>
              <span>
                {capitalizeFirstLetter(params?.row?.role?.name || "N/A")}
              </span>
            </Box>
          )}
        </Box>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created On",
      flex: 1,
      width: "30%",
      align: "start",
      headerAlign: "start",
      renderCell: (params) => (
        <Box className="title-style">
          {!params?.row?.editable && (
            <Box>
              <span>
                {capitalizeFirstLetter(params?.row?.createdAt || "N/A")}
              </span>
            </Box>
          )}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "start",
      renderCell: (params) => (
        <Box className="">
          {!params?.row?.editable && (
            <span>{capitalizeFirstLetter(params?.row?.status || "N/A")}</span>
          )}
        </Box>
      ),
    },
    {
      field: "lastLogin",
      headerName: "Last Login",
      flex: 1,
      headerAlign: "start",
      renderCell: (params) => (
        <Box className="">
          {!params?.row?.editable && (
            <span>
              {capitalizeFirstLetter(params?.row?.lastLogin || "N/A")}
            </span>
          )}
        </Box>
      ),
    },
    ...(hasFullAccess || canEdit
      ? [
          {
            field: "actions",
            headerName: "Actions",
            flex: 0.8,
            headerAlign: "center",
            align: "center",
            sortable: false,
            renderCell: (params) => {
              const isMenuOpen =
                menuState.anchorEl !== null &&
                menuState.rowId === params?.row?._id;

              return (
                <Box
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Tooltip title="More actions">
                    <span>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, params?.row?._id)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>

                  <Menu
                    anchorEl={menuState.anchorEl}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: {
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
                        borderRadius: "8px",
                        minWidth: "160px",
                      },
                    }}
                  >
                    {params?.row?.status !== "archived" && (
                      <MenuItem
                        onClick={() => handleEditClick(params?.row)}
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "13px",

                          gap: "8px",
                        }}
                      >
                        Edit User
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => handleStatusClick(params?.row)}
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "13px",
                        gap: "8px",
                      }}
                    >
                      {params?.row?.status === "active"
                        ? "Inactivate User"
                        : "Activate User"}
                    </MenuItem>
                    {params?.row?.status !== "archived" && (
                      <MenuItem
                        onClick={() => handleDeleteClick(params?.row)}
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "13px",
                          color: "red",
                        }}
                      >
                        Delete User
                      </MenuItem>
                    )}
                  </Menu>
                </Box>
              );
            },
          },
        ]
      : []),
  ];

  useEffect(() => {
    if (debouncedSearchTerm.length >= 0) {
      getAllUsers(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    getRole();
  }, []);

  const getAllUsers = async (input) => {
    setLoading(true);
    const response = await GetUsers(searchTerm);
    if (response?.data?.status) {
      const list = response?.data?.users || [];
      setOriginalUsers(list);
      setUsers(list);
    } else {
      showToast(response?.error, "error");
    }
    setLoading(false);
  };

  const getRole = async () => {
    try {
      const res = await GetUserRoleList();
      const roles = res?.data?.roles;
      setRoleList(roles || []);
    } catch (error) {
      console.error("Error fetching frameworks:", error);
      return [];
    }
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const deleteUser = async () => {
    if (btnLoading) return;
    setBtnLoading(true);
    const res = await UpdateUserStatus(selectedUser?._id, "archived");
    if (res?.status) {
      showToast(res?.msg, "success");
    } else {
      showToast(res?.error, "error");
    }
    setBtnLoading(false);
    return res;
  };

  const handleUpdateUserStatus = async () => {
    if (btnLoading) return;
    setBtnLoading(true);
    const res = await UpdateUserStatus(
      selectedUser?._id,
      selectedUser?.status === "active" ? "inactive" : "active",
    );

    setBtnLoading(false);
    return res;
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleStatusSelect = (item) => {
    setFilterUserData((prevState) => {
      const currentStatus = prevState.status || [];
      return {
        ...prevState,
        status: currentStatus.includes(item)
          ? currentStatus.filter((data) => data !== item)
          : [...currentStatus, item],
      };
    });
  };

  const handleRoleSelect = (item) => {
    setFilterUserData((prevState) => {
      const currentStatus = prevState.role || [];
      return {
        ...prevState,
        role: currentStatus.includes(item)
          ? currentStatus.filter((data) => data !== item)
          : [...currentStatus, item],
      };
    });
  };

  // ── filter config ──
  const defaultFilterState = {
    role: [],
    status: [],
  };

  const parseDDMMYYYY = (str) => {
    if (!str) return null;
    const [day, month, year] = str.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const filterFunction = (filters) => {
    const { role, status } = filters;

    const noFiltersApplied = role?.length === 0 && status?.length === 0;

    if (noFiltersApplied) {
      return originalUsers;
    }

    return originalUsers.filter((item) => {
      const roleMatch =
        role?.length > 0 ? role.includes(item?.role?._id) : true;

      const statusMatch =
        status?.length > 0 ? status.includes(item?.status) : true;

      return roleMatch && statusMatch;
    });
  };

  const {
    filterState: filterUserData,
    setFilterState: setFilterUserData,
    filteredData: users,
    setFilteredData: setUsers,
    appliedFilterCount,
    applyFilter,
    clearFilter,
  } = usePersistedFilter(
    "usersManagementFilterState",
    "usersManagementFilterCount",
    defaultFilterState,
    originalUsers,
    filterFunction,
    setOpen,
  );

  return (
    <GlobleStyle>
      <Box className="parent-container">
        <Box className="policies-container">
          <Typography className="policies-text">User Management</Typography>

          {(hasFullAccess || canEdit) && (
            <Button
              className="create-policy"
              onClick={() => setOrgModalOpen(true)}
            >
              <Box className="create-policy-label">
                <img src={addPolicy} alt="icon" className="add-svg-icon" />
                Add User
              </Box>
            </Button>
          )}
        </Box>
        <Box style={{ paddingTop: "2%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Box className="only-filter-container">
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <SearchBar
                  className="searchbar-style"
                  placeholder="Search User"
                  onChange={handleSearch}
                  value={searchTerm}
                />

                {appliedFilterCount > 0 && (
                  <Tooltip
                    placement="top"
                    title={"Clear Filters"}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          fontFamily: "Poppins",
                          fontSize: fontSize.p,
                        },
                      },
                    }}
                  >
                    <IconButton onClick={clearFilter} size="small">
                      <FilterAltOffOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                )}

                <CustomButton
                  className="manage-btn"
                  onClick={toggleDrawer(true)}
                  label={
                    <Box
                      className="manage-btn-label"
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img src={filter} alt="icon" />

                      {appliedFilterCount > 0 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: -6,
                            right: -10,
                            background: colors.red,
                            color: "white",
                            borderRadius: "50%",
                            minWidth: "18px",
                            height: "18px",
                            fontSize: "11px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 500,
                          }}
                        >
                          {appliedFilterCount > 9 ? "9+" : appliedFilterCount}
                        </Box>
                      )}

                      <p>Filter</p>
                    </Box>
                  }
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ overflowX: "auto", width: "100%" }}>
            <CustomeDataGrid
              rows={users}
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
              // onRowClick={(params, event) => {
              //   if (event.target.closest(".MuiDataGrid-cellCheckbox")) return;

              //   if (event.target.closest(".MuiDataGrid-actionsCell")) return;

              //   handleRowClicked(params.row._id);
              // }}
              getRowId={(row) => row._id}
              rowsPerPageOptions={[5]}
              disableColumnFilter
              sx={{
                "& .MuiDataGrid-row": {
                  minHeight: "100px !important",
                  maxHeight: "auto !important",
                  // cursor: "pointer",
                },
              }}
            />
          </Box>
        </Box>

        <Drawer
          open={open}
          anchor="right"
          onClose={toggleDrawer(false)}
          style={{ overflow: "hidden" }}
        >
          <GlobleStyle>
            <Box>
              <form>
                <Box className="drawer-container" role="presentation">
                  <Box className="filter-box">
                    <Box>
                      <Box className="item-baseline">
                        <Typography className="edit-text">
                          Edit Filters
                        </Typography>
                        <Typography className="clear-btn" onClick={clearFilter}>
                          Clear all filters
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box className="mfa-parent-container">
                    {/* Status filter */}
                    <Box>
                      <Typography className="font-semibold filter-type">
                        Status
                      </Typography>
                      <Box style={{ paddingBottom: "2%" }}>
                        {["active", "inactive", "archived"].map(
                          (item, index) => (
                            <Box
                              key={index}
                              className="role-checkbox-container"
                            >
                              <input
                                type="checkbox"
                                autoComplete="off"
                                name={item}
                                id={`org-status-${item}`}
                                checked={filterUserData.status.includes(item)}
                                onChange={() => handleStatusSelect(item)}
                              />
                              <label
                                htmlFor={`org-status-${item}`}
                                style={{ marginLeft: "2%" }}
                              >
                                {capitalize(item || "")}
                              </label>
                            </Box>
                          ),
                        )}
                      </Box>
                    </Box>

                    {/* role filter */}
                    <Box>
                      <Typography className="font-semibold filter-type">
                        Role
                      </Typography>
                      <Box style={{ paddingBottom: "2%" }}>
                        {roleList.map((item, index) => (
                          <Box key={index} className="role-checkbox-container">
                            <input
                              type="checkbox"
                              autoComplete="off"
                              name={item?._id}
                              id={`org-role-${item?._id}`}
                              checked={filterUserData.role.includes(item?._id)}
                              onChange={() => handleRoleSelect(item?.role)}
                            />
                            <label
                              htmlFor={`org-status-${item}`}
                              style={{ marginLeft: "2%" }}
                            >
                              {capitalize(item?.name || "")}
                            </label>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>

                  <Box className="filter-btn-container">
                    <Button
                      className="policy-cancel-btn"
                      onClick={() => setOpen(false)}
                      fullWidth
                    >
                      Cancel
                    </Button>
                    <Button
                      className="apply-filter-btn"
                      onClick={() => applyFilter()}
                    >
                      Apply
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </GlobleStyle>
        </Drawer>

        {orgModalOpen ? (
          <AddUserModal
            open={orgModalOpen}
            onClose={() => setOrgModalOpen(false)}
            refreshList={getAllUsers}
            roleList={roleList}
          />
        ) : null}

        {editUserModal ? (
          <AddUserModal
            open={editUserModal}
            onClose={() => setEditUserModal(false)}
            refreshList={getAllUsers}
            data={selectedUser}
            isEdit={true}
            roleList={roleList}
          />
        ) : null}

        {deleteUserModal ? (
          <DeleteModal
            open={deleteUserModal}
            onClose={() => setDeleteUserModal(false)}
            onDelete={deleteUser}
            refreshList={getAllUsers}
            loading={btnLoading}
            message="Are you sure you want to delete ?"
            btnDisable={btnLoading}
          />
        ) : null}

        {updateStatusModal ? (
          <UpdateUserStatusModal
            open={updateStatusModal}
            onClose={() => setUpdateStatusModal(false)}
            onSubmit={handleUpdateUserStatus}
            refreshList={getAllUsers}
            isActive={selectedUser?.status !== "active"}
            loading={btnLoading}
            btnName={
              selectedUser?.status == "active" ? "Inactivate" : "Activate"
            }
            message={`Are you sure you want to ${selectedUser?.status == "active" ? "Inactivate" : "Activate"} this user ?`}
            btnDisable={btnLoading}
          />
        ) : null}
      </Box>
    </GlobleStyle>
  );
};

export default UserManagement;
