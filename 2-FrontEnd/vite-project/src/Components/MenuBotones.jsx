import Botones from "./Botones"
import { useState } from "react";
import General from "./General";
import Analitica from "./Analitica"
function MenuBotones() {
    const [opcion, setOpcion] = useState(0);
    return (
        <>
        <div className="dashboard-espaciado">
        <div className='div-botones-overview'>
            <Botones opcion={opcion} setOpcion={setOpcion}/>
        </div>
                {opcion === 0 && <General/>}
                {opcion === 1 && <Analitica/>}
        </div>
        </>
    );
}
  
  export default MenuBotones;



