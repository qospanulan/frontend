import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  IconButton,
  Button,
  Box,
  Paper,
  TableContainer,
  TablePagination,
  MenuItem,
  Select,
  InputAdornment,
  ListSubheader,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const SimpleTable = ({
  data,
  columns,
  filters,
  onFilterChange,
  pagination,
  setPagination,
  rowCount,
}) => {
  const [filterValues, setFilterValues] = useState(filters);
  const [searchText, setSearchText] = useState("");
  // const [selectedOption, setSelectedOption] = useState("");

  const emptyRows =
    pagination.page > 0
      ? Math.max(3, (1 + pagination.page) * pagination.pageSize - rowCount)
      : rowCount > 3
      ? 0
      : 3;

  const [activeFilterField, setActiveFilterField] = useState({
    field: null,
    value: "",
  });

  // const containsText = (text, searchText) =>
  //   text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  // const displayedOptions = useMemo(
  //   () => allOptions.filter((option) => containsText(option, searchText)),
  //   [searchText]
  // );

  const handleFilterChange = (field, value) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleFilterSubmit = (field, value) => {
    handleFilterChange(field, value);
    onFilterChange({ ...filterValues, [field]: value });
  };

  const handleFilterIconClick = (field, value) => {
    setActiveFilterField(
      activeFilterField.field === field
        ? { field: null, value: "" }
        : { field: field, value: "" }
    );
  };

  return (
    <Paper sx={{ width: "100%", maxHeight: "75vh", overflow: "auto" }}>
      <TableContainer component={Paper}>
        {/* {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <CircularProgress />
          </div>
        )} */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} sx={{ position: "relative" }}>
                  {column.headerName}

                  {column.filterable !== false && (
                    <IconButton
                      size="small"
                      title={`Filter ${column.headerName}`}
                      onClick={() => handleFilterIconClick(column.field, "")}
                      sx={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {filters.hasOwnProperty(column.field) &&
                      filters[column.field] ? (
                        <FilterAltIcon />
                      ) : (
                        <FilterAltOutlinedIcon />
                      )}
                    </IconButton>
                  )}
                  {activeFilterField.field === column.field && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "100%",
                        backgroundColor: "white",
                        padding: "5px",
                        border: "1px solid #e4e4e4",
                        borderRadius: "5px",
                      }}
                    >
                      {!column.filterType && (
                        <TextField
                          variant="outlined"
                          size="small"
                          placeholder={`Filter ${column.headerName}`}
                          //   value={filterValues[column.field] || ""}
                          value={
                            activeFilterField?.value ||
                            filterValues[column?.field] ||
                            ""
                          }
                          onChange={
                            (e) => {
                              handleFilterChange(column.field, "");
                              setActiveFilterField({
                                field: column.field,
                                value: e.target.value,
                              });
                            }
                            //   handleFilterChange(column.field, e.target.value)
                          }
                          InputProps={{
                            endAdornment: filterValues[column.field] && (
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setActiveFilterField({
                                    field: column.field,
                                    value: "",
                                  });
                                  handleFilterSubmit(column.field, "");
                                }}
                              >
                                <ClearIcon />
                              </IconButton>
                            ),
                          }}
                        />
                      )}

                      {column.filterType === "select" && (
                        <Select
                          fullWidth
                          MenuProps={{ autoFocus: false }}
                          labelId="search-select-label"
                          id="search-select"
                          value={
                            activeFilterField?.value ||
                            filterValues[column?.field] ||
                            ""
                          }
                          label="Options"
                          onChange={(e) => {
                            handleFilterChange(column.field, "");
                            setActiveFilterField({
                              field: column.field,
                              value: e.target.value,
                            });
                          }}
                          onClose={() => setSearchText("")}
                          renderValue={() => activeFilterField?.value}
                        >
                          <ListSubheader>
                            <TextField
                              size="small"
                              // Autofocus on textfield
                              autoFocus
                              placeholder="Type to search..."
                              fullWidth
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon />
                                  </InputAdornment>
                                ),
                              }}
                              onChange={(e) => setSearchText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key !== "Escape") {
                                  // Prevents autoselecting item while typing (default Select behaviour)
                                  e.stopPropagation();
                                }
                              }}
                            />
                          </ListSubheader>
                          <MenuItem value="">All</MenuItem>
                          {column.filterOptions
                            .filter((option) =>
                              option.value
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                            )
                            .map((option, index) => (
                              <MenuItem key={index} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                        </Select>
                      )}

                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          handleFilterSubmit(
                            column.field,
                            activeFilterField.value
                          )
                        }
                        sx={{ mt: 1 }}
                      >
                        Submit
                      </Button>
                    </Box>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>{row[column.field]}</TableCell>
                ))}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 18, 20, 30, 40, 50]}
        component="div"
        count={rowCount}
        rowsPerPage={pagination.pageSize}
        page={pagination.page}
        onPageChange={(e, newPage) =>
          setPagination((pagination) => ({ ...pagination, page: newPage }))
        }
        onRowsPerPageChange={(event) =>
          setPagination((pagination) => ({
            ...pagination,
            pageSize: parseInt(event.target.value, 10),
          }))
        }
      />
    </Paper>
  );
};

export default SimpleTable;
