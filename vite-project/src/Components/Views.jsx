import Formulario from "../Pages/Formulario";
import { Route, Routes, Link } from "react-router-dom";
function Views() {

  return (
    <Routes>
      <Route path="/" element={<Formulario />} />
    </Routes>
  )
}

export default Views;
