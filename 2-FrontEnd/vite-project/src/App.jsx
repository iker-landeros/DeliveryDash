import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Styles/Fuente.css";
import Formulario from "./Pages/Formulario";
import Dashboard from "./Pages/Dashboard";
import Analitica from "./Components/Analitica";
import General from "./Components/General";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario />}></Route>
        <Route path="/Dashboard"element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route path="analitica" element={<ProtectedRoute><Analitica /></ProtectedRoute>} />
          <Route path="general" element={<ProtectedRoute><General /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;