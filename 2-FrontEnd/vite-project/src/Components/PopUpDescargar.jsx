import "../Styles/PopUpDescagar.css"
import { useRef,useState,useEffect } from 'react'
import { CSVLink } from "react-csv";
const  PopUpDescargar = () => {
    const [currentDate] = useState(new Date());

    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  
    const [alumnos,setAlumnos] = useState([]);
    useEffect(() => {
      fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/alumnos', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
        .then(data => data.json())
        .then((data) => {
          setAlumnos(data)
          console.log(data)
        })
    }, [])
    
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


    console.log(currentDate)

    const [myVar, setMyVar] = useState(1);
    return (
    <>
        {myVar === 1 ? (
        <div>
            <a href="#openModal2" className="modalAgregar" onClick={handleOpenModal}>Descagar</a>
    
            <div id="openModal2" className="modalDialog">
                <div>
                    <a href="#close" title="Close" className="close" onClick={handleCloseModal}>X</a>
                    <div className="container-modal-div">
                        <p>Nombre del reporte:</p>
                        <p className="texto-modal-sub">Datos de los jugadores</p>
                        <p>Fecha:</p>
                        <p className="texto-modal-sub">{formattedDate}</p>
                        <p>Descripción:</p>
                        <p className="texto-modal-sub">Este informe incluye datos sobre los jugadores, los niveles que completaron, el tiempo que les llevó y las estrellas que ganaron.</p>
                        <div className="div-boton-modal">
                            <CSVLink data={alumnos} filename={"Reporte.csv"}><button className="boton-descargar">Descargar</button></CSVLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ) : (
        <div>
            <a href="#openModal2" className="modalAgregar" onClick={handleOpenModal}>Agregar Curso</a>
    
            <div id="openModal2" className="modalDialog">
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
