import { useRef } from 'react';
const UserCard = ({ user }) => {
    const cardRef = useRef(null);
    return (
        <div ref={cardRef} className="card" key={user.alumnoID}>
        <input type="radio" name="alumno" 
        key={user.cursoID} 
        id={user.cursoID}></input>
        <p>{user.nombre}</p>
      </div>  
    );
  };
export default UserCard;