import "../Styles/PopUpDescagar.css"
import { useRef,useState,useEffect } from 'react'
import { CSVLink } from "react-csv"
import { useParams } from "react-router-dom";
;
const  PopUpDescargar = () => {
    const { id } = useParams();

    const [currentDate] = useState(new Date());

    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };
    
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const [alumnos,setAlumnos] = useState([]);

    const fetchApi = async (url,data,setFunction,isArray) =>{
        try {
            const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
            },
            body: JSON.stringify({
                cursoID: data 
            }),
            })
            const result = await response.json();
            setFunction(isArray ? result : result[0]);
        } catch (err){
            console.log('error', err);
        }
    }
    useEffect(() => {
        fetchApi(`${import.meta.env.VITE_SECRET}/alumnos/total/curso/info`,
        id,setAlumnos,true)
    },[id]);
    
    return (
    <>
        <div>
            <a href="#openModal2" className="modalAgregar" onClick={handleOpenModal}>Descagar</a>
    
            <div id="openModal2" className="modalDialog">
                <div>
                    <a href="#close" title="Close" className="close" onClick={handleCloseModal}>X</a>
                    <div className="container-modal-div">
                        <p>Nombre del reporte:</p>
                        <p className="texto-modal-sub">Datos de los jugadores del curso {id}</p>
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
    </>
    )
}

export default PopUpDescargar;
