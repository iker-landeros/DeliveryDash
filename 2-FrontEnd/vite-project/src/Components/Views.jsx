import Formulario from "../Pages/Formulario";
import Dashboard from "../Pages/Dashboard";
import Analitica from "../Components/Analitica"
import General from "../Components/General";
import { Route, Routes, Link } from "react-router-dom";
function Views() {

  return (
    <Routes>
      <Route path = "/" element={<Formulario />} />
      <Route path = "Dashboard" element={<Dashboard />}>
        <Route path = 'analitica' element={<Analitica/>} />
        <Route path = 'general' element={<General/>} />
      </Route>
    </Routes>
  )
}

export default Views;
