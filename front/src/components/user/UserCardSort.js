import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ButtonGroup, ToggleButton } from 'react-bootstrap';

import * as Api from '../../api';
import { UserStateContext } from '../../App';
import axios from 'axios';


const UserCardSort = () => {
	const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);

	const [sortBy, setSortBy] = useState('updateAt');
	console.log(sortBy)

	const sort = [
    { name: 'Recently', value: 'updateAt' },
    { name: 'Like', value: 'likeCount' },
    { name: 'View', value: 'viweCount' },
  ];

  const handelClickSortBtn = async() => {

		Api.get('userlist', sortBy).then(res => setUsers(res.data));
		console.log(sortBy)

		// try{
		// 	const data = await axios.get("userlist", sortBy);
		// 	console.log(sortBy)
		// } catch {
		// 	console.log("errrr")
		// }
	}

	return (
		<ButtonGroup style={{ marginBottom:"20px"}}>
        {sort.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="outline-secondary"
            name="radio"
            value={radio.value}
            checked={sortBy === radio.value}
            onChange={(e) => setSortBy(e.currentTarget.value)}
						onClick={handelClickSortBtn}
						>
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
	)
}

export default UserCardSort;