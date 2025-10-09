import { Routes, Route } from "react-router";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Task from "./components/Task";
import Notes from "./components/Notes";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Task />} />
        <Route path="/notes" element={<Notes />} />
      </Route>
    </Routes>
  );
};

export default App;
