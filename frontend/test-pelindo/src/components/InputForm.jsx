import { useEffect, useState } from 'react'
import axios from 'axios'
import { Input, Button } from '@material-tailwind/react'

function InputForm() {
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState({
    namalengkap: '',
    username: '',
    password: '',
    status: ''
  })

  const fetchdata = () => {
    axios.get(`http://localhost:3000/getDataUser/all`).then((response) => {
      setUsers(response.data)
    })
  }

  useEffect(() => {
    fetchdata()
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  }

  const registerUser = () => {
    axios.post(`http://localhost:3000/setDataUser`, newUser).then(() => {
      fetchdata()
      setNewUser({
        namalengkap: '',
        username: '',
        password: '',
        status: ''
      })
    })
  }

  const deleteUser = (userid) => {
    axios.delete(`http://localhost:3000/delDataUser/${userid}`).then(() => {
      fetchdata()
    })
  }

  return (
    <div className=''>
      <h1 className='flex justify-center items-center text-2xl font-extrabold text-gray-900 p-4'>
        User Display
      </h1>
      <div>
        <h2 className='flex justify-center items-center text-xl font-bold text-gray-800 p-4'>
          Add user
        </h2>
        <div className='flex justify-center items-center'>
          <div className='flex flex-col justify-center items-center gap-4 w-[500px]'>
            <Input
              size='large'
              label='nama lengkap'
              variant='standard'
              color='blue'
              type='text'
              name='namalengkap'
              value={newUser.namalengkap}
              onChange={handleInputChange}
            />
            <Input
              label='User name'
              variant='standard'
              color='blue'
              type='text'
              name='username'
              value={newUser.username}
              onChange={handleInputChange}
            />
            <Input
              label='Password'
              variant='standard'
              color='blue'
              type='password'
              name='password'
              value={newUser.password}
              onChange={handleInputChange}
            />
            <Input
              label='Status'
              variant='standard'
              color='blue'
              type='text'
              name='status'
              value={newUser.status}
              onChange={handleInputChange}
            />
            <Button
              variant='contained'
              onClick={registerUser}>
              Register
            </Button>
          </div>
        </div>
      </div>
      <div>
        <h2 className='flex justify-center items-center p-4 text-lg font-bold text-gray-800'>
          User List
        </h2>
        <ul className='flex flex-col justify-center items-center'>
          {users.map((user) => (
            <li
              className='flex flex-col justify-center items-center gap-4 p-4'
              key={user.userid}>
              <p className='flex justify-center items-center'>Nama Lengkap = {user.namalengkap}</p>
              <p className='flex justify-center items-center'>Username = {user.username}</p>
              <p className='flex justify-center items-center'>Status = {user.status}</p>
              <Button
                variant='contained'
                onClick={() => deleteUser(user.userid)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default InputForm
