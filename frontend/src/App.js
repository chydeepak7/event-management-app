import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import CreateEvent from "./components/CreateEvent";
import UpdateEvent from "./components/UpdateEvent";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={Homescreen} exact />
          <Route path="/create" Component={CreateEvent} exact />
          <Route path="/update/:id" Component={UpdateEvent} exact />
        </Routes>
      </Router>

      <script src="assets/bootstrap/js/bootstrap.min.js"></script>
      <script src="assets/js/bold-and-bright.js"></script>
    </div>
  );
}

export default App;
