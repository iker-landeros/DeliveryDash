import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../Styles/Fuente.css";
import Formulario from "../Pages/Formulario";
import Dashboard from "../Pages/Dashboard";
import ProtectedRoute from "../Components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario />}></Route>
        <Route path="/Dashboard/:id"element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;