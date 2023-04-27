import "./App.css";
import { Button, ButtonGroup } from "@chakra-ui/react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import ResetPassword from "./components/resetPassword";
import CheckEmail from "./components/checkEmail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
      <Routes>
        <Route path="/checkEmail" element={<CheckEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
