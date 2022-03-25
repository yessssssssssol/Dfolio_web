import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { UserStateContext } from "../../App";
import github from '../../img/github.png'

import * as Api from "../../api";
import '../../styles/scss/UserCard.scss';

function UserCard({
  user,
  users,
  setIsEditing,
  isEditable,
  isNetwork,
  setUser,
  setUsers,
}) {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const handleButtonClick = async (e) => {
    e.stopPropagation();

    const res = await Api.put(`like/${userState.user.id}`, {
      otherUserId: user.id,
    });
    const updatedUser = res.data;

    if (isNetwork) {
      const newUsers = users.map((user) => {
        if (user.id === updatedUser.id) {
          return {
            ...user,
            likeCount: updatedUser.likeCount,
          };
        }
        return user;
      });
      setUsers(newUsers);
    } else {
      setUser(updatedUser);
    }
  };
  // const { likeCount } = await api.post();
  // setLike(likeCount);
  return (
    <div className="card-container" id="card-container">
        <div className="card-box">
        <div className="card-isEditable-hover-container">
          <div className="card-img-container" onClick={()=> navigate(`/users/${user.id}`)}>
            <img 
              id="card-img" 
              src={ user?.image ? user?.image : "http://placekitten.com/200/200" }
              alt="user profile" />
            {isNetwork && (
              <div id="card-hover">
                Portfolio 👉
              </div>
            )}
            {isEditable && (
              <div
                id="card-isEditable-hover"
                onClick={() => setIsEditing(true)}
              >
                Profile Edit 👉
              </div>
            )}
          </div>
        </div>
        <div className="text-wrap">
          <div id="card-name">{ user?.name }</div>
          <div id="card-email">{ user?.email }</div>
          <div id="card-description">{ user?.description }</div>
        </div>
        <a href={ user?.profilelink }>
          <div className="card-link-box">
            <img id="card-link-img" src={github} alt="github link icon"/>
            <p>Github</p>
          </div>
        </a>
        <div className="card-like-box" onClick={handleButtonClick}>
          <p id="like-text">Like 👍</p>
          <p id="like-num">{ user?.likeCount }</p>
        </div>
      </div>
	  </div>
  );
}

export default UserCard;
