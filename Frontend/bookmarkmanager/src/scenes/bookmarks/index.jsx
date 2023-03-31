import { useState, useEffect } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import UpdateBookmark from "./UpdateBookmark";

const Bookmarks = ({ route }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [listOfBookmarks, setListOfBookmarks] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();

  function getBookmarks() {
    fetch(
      `https://localhost:7235/api/BookmarkItems/bookmarkGId/${state.bookmarkGroupId}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Went Wrong");
        }
        return response.json();
      })
      .then((data) => {
        setListOfBookmarks(data);
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      });
  }

  function openLink(url) {
    window.open(url, "_blank");
  }

  function updateLink(data){
    navigate("/updatebookmark",{
      state: data,
    }, { replace: true });
  }

  function deleteLink(bookmarkId) {
    fetch(`https://localhost:7235/api/BookmarkItems/${bookmarkId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        getBookmarks();
        return response.json();
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      });
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData == null) {
      navigate("/login", { replace: true });
    }
    console.log(`BookmarkGID: ${state.bookmarkGroupId}`);
    getBookmarks();
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "TITLE",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "url",
      headerName: "URL",
      flex: 2,
    },
    {
      field: "Link",
      headerName: "LINK",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          <ButtonBase onClick={() => openLink(params.row.url)}>OPEN</ButtonBase>
        </Typography>
      ),
    },
    {
      field: "Link1",
      headerName: "UPDATE",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          <ButtonBase onClick={() => updateLink(params.row)}>
            UPDATE
          </ButtonBase>
        </Typography>
      ),
    },
    {
      field: "Lin2k",
      headerName: "DELETE",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          <ButtonBase onClick={() => deleteLink(params.row.id)}>
            DELETE
          </ButtonBase>
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "DATE",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="BOOKMARKS"
        subtitle="List of All Bookmarks"
      />
      <Box
        m="40px 0 0 0"
        height="65vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={listOfBookmarks}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Bookmarks;
