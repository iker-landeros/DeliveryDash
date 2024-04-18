import "../Styles/AgregarUsuario.css"
import { useRef,useState } from 'react'

const  AgregarUsuario = () => {
    const agregarForm = useRef(null)
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleOnSubmit = async (evt) =>{
        evt.preventDefault() 
        const form = new FormData(agregarForm.current)
        const reponse = await fetch('http://deliverydashapi-env.eba-i3jft8cm.us-east-1.elasticbeanstalk.com/cursos',{
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
            },
            body: form
            })
        const data = await reponse.json()
        if(data.mensaje){
            console.log(data.mensaje)
            setMyVar(2);
            console.log(myVar)
        }
    }
    const [myVar, setMyVar] = useState(1);
    return (
    <>
        {myVar === 1 ? (
        <div>
            <a href="#openModal" className="modalAgregar" onClick={handleOpenModal}>Agregar Curso</a>
    
            <div id="openModal" className="modalDialog">
                <div>
                    <a href="#close" title="Close" className="close" onClick={handleCloseModal}>X</a>
                    <h2>Agregar Curso</h2>
                    <form className="formagregar" onSubmit={handleOnSubmit} ref={agregarForm}>
                        <p>Nombre</p>
                        <input name="nombre"></input>
                        <p>Fecha inicio</p>
                        <input type="date" name="dateInicio"></input>
                        <p>Fecha Final</p>
                        <input type="date" name="dateFinal"></input>
                        <div className="div-boton-modal">
                            <button className="formagregarbutton" type="submit">Agregar</button>
                        </div>
                    </form>
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

export default AgregarUsuario;
