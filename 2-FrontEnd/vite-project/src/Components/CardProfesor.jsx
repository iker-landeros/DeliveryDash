import { useRef } from 'react';
const ProfesorCard = ({ user,handleClickProf }) => {
    const cardRef = useRef(null);
    return (
        <div ref={cardRef} className="card" key={user.profesorID}>
        <input type="radio" name="profesor" 
          key={user.profesorID} 
          id={user.profesorID}
          onClick={()=>{handleClickProf(user.profesorID)}}
          >
        </input>
        <p>{user.fName}</p>
      </div>  
    );
  };
export default ProfesorCard;