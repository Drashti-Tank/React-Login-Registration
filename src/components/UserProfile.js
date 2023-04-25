import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function UserProfile() {

  const token = JSON.parse(localStorage.getItem('TOKEN'));
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://real-pear-fly-kilt.cyclic.app/accounts', {
      headers: {
        'Authorization': `Bearer ${token.jwtToken}`
      }
    })
      .then(response => setData(response.data))
  }, [token]);

  console.log(data);

  // const handleLogout = () => {
    
  //   localStorage.removeItem('TOKEN');
   
  //   setToken({});
  // }

  return (
    <div>
      <Table striped bordered hover variant="secondary">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.map((profile) => {
              return (
                <tr key={profile.id}>
                  <td>{profile.id}</td>
                  <td>{profile.title}</td>
                  <td>{profile.firstName}</td>
                  <td>{profile.lastName}</td>
                  <td>{profile.email}</td>

                </tr>

              )
            })
          }
        </tbody>
      </Table>
      {/* <button className='justify-content-center' onClick={handleLogout}>Logout</button> */}
    </div>
  );
}

export default UserProfile;
