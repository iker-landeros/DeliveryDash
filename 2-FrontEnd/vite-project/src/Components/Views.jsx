import Formulario from "../Pages/Formulario";
import Dashboard from "../Pages/Dashboard";
import Analitica from "../Components/Analitica"
import General from "../Components/General";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
const  Views = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="Dashboard" index element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route path="analitica" element={<ProtectedRoute><Analitica /></ProtectedRoute>} />
          <Route path="general" element={<ProtectedRoute><General /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Views;
