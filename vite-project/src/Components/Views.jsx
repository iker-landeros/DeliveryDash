import Formulario from "../Pages/Formulario";
import Dashboard from "../Pages/Dashboard";
import { Route, Routes, Link } from "react-router-dom";
function Views() {

  return (
    <Routes>
      <Route path="/" element={<Formulario />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default Views;
