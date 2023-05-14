import axios from "axios";
import "./widgetSm.css";
// import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
// import { userRequest } from "../../requestMethods";

const API_URL = "http://localhost:3000/api/users";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        // const res = await axios.get();
        const res = await axios.get(`${API_URL}/?new=true`, { withCredentials: true });
        setUsers(res.data);
      } catch {}
    };
    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" className="widgetSmImg" />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              {/* <Visibility className="widgetSmIcon" /> */}
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
