// import "./home.css";
import { useEffect, useMemo, useState } from "react";
import Chart from "../../components/chart/chart"
import WidgetLg from "../../components/widgetLg/widgetLg"
import WidgetSm from "../../components/widgetSm/widgetSm"
import axios from "axios";
import { Container, Grid, Box, Paper, Avatar, Button, TextField, Checkbox, } from "@mui/material";

const API_URL = "http://localhost:3000/api/users";

export default function Home() {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"
    ], []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/stats`, { withCredentials: true },);
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { month: MONTHS[item._id - 1], "Active User": item.total }
          ])
        );
      } catch (err) { console.log(err); }
    };
    getStats();
  }, [MONTHS]);

  return (
    // <div className="home">
    <Container height={"auto"} sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        {/* <FeaturedInfo /> */}
        <Grid item xs={12} md={12} lg={12} sx={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Chart
            data={userStats}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
        </Grid>

        <Grid item xs={12} md={3} lg={4} sx={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <WidgetSm />
        </Grid>

        <Grid item xs={12} md={9} lg={8} sx={{
          display: 'flex', flexDirection: 'column'
        }}>
          <WidgetLg />
        </Grid>
        {/* </div> */}

      </Grid>
    </Container>
  );
}
