import "./home.css";
import { useEffect, useMemo, useState } from "react";
import Chart from "../../components/chart/chart";
import WidgetLg from "../../components/widgetLg/widgetLg";
import WidgetSm from "../../components/widgetSm/widgetSm";
// import { userRequest, publicRequest } from "../../requestMethods"
import axios from "axios";

const API_URL = "https://us-central1-web-shop-group-3.cloudfunctions.net/api/users";

export default function Home() {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"], []);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/stats`, { withCredentials: true });
        res.data.map((item) => setUserStats((prev) => [...prev, { month: MONTHS[item._id - 1], "Active User": item.total }]));
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      {/* <FeaturedInfo /> */}
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
