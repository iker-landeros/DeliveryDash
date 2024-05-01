import { useRef } from 'react';
const UserCard = ({ user,handleClickCurso }) => {
    const cardRef = useRef(null);
    return (
        <div ref={cardRef} className="card" key={user.alumnoID}>
        <input type="radio" name="curso" 
          key={user.cursoID} 
          id={user.cursoID}
          onClick={()=>{handleClickCurso(user.cursoID)}}>  
        </input>
        <p>{user.nombre}</p>
      </div>  
    );
  };
export default UserCard;