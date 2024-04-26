import { useRef } from 'react';
const UserCard = ({ user }) => {
  const cardRef = useRef(null);
  return (
    <div ref={cardRef} className="card" key={user.alumnoID}>
        <input type="radio" name="alumno" 
        key={user.alumnoID} 
        id={user.alumnoID}></input>
        <p>{user.nickname}</p>
    </div>  
    );
  };
export default UserCard;