import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, ButtonBase, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [listOfGroups, setListOfGroups] = useState([]);

  function getBookmarkGroups(userId) {
    fetch(`https://localhost:7235/api/bookmarkgroups/group/${userId}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Went Wrong");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setListOfGroups(data);
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
    getBookmarkGroups(userData.id);
  }, []);

  function navigateToBookmark(bookmarkGroupId, bookmarkGroupName){
    navigate("/bookmarks",{
      state: {
        bookmarkGroupId: bookmarkGroupId,
        bookmarkGroupName: bookmarkGroupName,
      }
    }, { replace: true });
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DASHBOARD"
          subtitle="Welcome to Bookmark Manager's Dashboard"
        />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {listOfGroups.map((group) => {
          return (
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
            <ButtonBase disableRipple={true} onClick={() => navigateToBookmark(group.id, group.name)}>
              <StatBox title={group.name} subtitle={group.description} />
            </ButtonBase>
            </Box> 
          );
        })}
        {/* ROW 1 */}

        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="YouTube Videos"
            subtitle="All 6th Sem Study Videos"
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Development"
            subtitle="Docs, Templates and other stuff"
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Competitive Programming"
            subtitle="GFG, CodeChef Problems"
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Extra"
            subtitle="Flutter + React Resources"
          />
        </Box> */}

        {/* ROW 2 */}

        {/* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box> */}

        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box> */}

        {/* ROW 3 */}
      </Box>
    </Box>
  );
};

export default Dashboard;
