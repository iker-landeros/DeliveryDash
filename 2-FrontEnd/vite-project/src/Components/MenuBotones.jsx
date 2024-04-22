import Botones from './Botones';
import React, { useState } from 'react';
import Analitica from "../Components/Analitica";
import General from "../Components/General";
import Inscripciones from "../Components/Inscripciones";

const  MenuBotones =() => {  
    const [opcion, setOpcion] = useState(0);
    return (
        <>
        <Botones opcion={opcion} setOpcion={setOpcion}/>
            {opcion === 0 && <General/>}
            {opcion === 1 && <Analitica/>}
            {opcion === 2 && <Inscripciones/>}
        </>   
    )
    }

export default MenuBotones;