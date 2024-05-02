import Botones from './Botones';
import React, { useState } from 'react';
import Analitica from "../Components/Analitica";
import General from "../Components/General";
import Administracion from "../Components/Administracion";

const  MenuBotones =() => {  
    const [opcion, setOpcion] = useState(0);
    return (
        <>
        <Botones opcion={opcion} setOpcion={setOpcion}/>
            {opcion === 0 && <General/>}
            {opcion === 1 && <Analitica/>}
            {opcion === 2 && <Administracion/>}
        </>   
    )
    }

export default MenuBotones;