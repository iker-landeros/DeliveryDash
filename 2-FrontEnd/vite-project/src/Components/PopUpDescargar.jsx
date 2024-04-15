import "../Styles/PopUpDescagar.css"
import { useRef,useState } from 'react'
import { CSVLink } from "react-csv";
const  PopUpDescargar = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };
    const jugadores = [
        {"id":1, "usuario" : "usuario 1", "horas" : 20},
        {"id":2, "usuario" : "usuario 2", "horas" : 30},
        {"id":3, "usuario" : "usuario 3", "horas" : 40},
        {"id":4, "usuario" : "usuario 4", "horas" : 50},
        {"id":5, "usuario" : "usuario 5", "horas" : 60}
    ]



    const [myVar, setMyVar] = useState(1);
    return (
    <>
        {myVar === 1 ? (
        <div>
            <a href="#openModal" className="modalAgregar" onClick={handleOpenModal}>Descagar</a>
    
            <div id="openModal" className="modalDialog">
                <div>
                    <a href="#close" title="Close" className="close" onClick={handleCloseModal}>X</a>
                    <div className="container-modal-div">
                        <p>Nombre del reporte:</p>
                        <p className="texto-modal-sub">Lorem Ipsum</p>
                        <p>Fecha</p>
                        <p className="texto-modal-sub">dd/mm/yyyy</p>
                        <p>Descripción</p>
                        <p className="texto-modal-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porttitor sagittis dui, ut placerat ex ullamcorper non. </p>
                        <div className="div-boton-modal">
                            <CSVLink data={jugadores} filename={"Reporte.csv"}><button className="boton-descargar">Descargar</button></CSVLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ) : (
        <div>
            <a href="#openModal" className="modalAgregar" onClick={handleOpenModal}>Agregar Curso</a>
    
            <div id="openModal" className="modalDialog">
                <div>
                    <a href="#close" title="Close" className="close" onClick={handleCloseModal}>X</a>
                    <p>Curso agregado correctamente</p>
                </div>
            </div>
        </div>
        )}
    </>
    )
}

export default PopUpDescargar;
