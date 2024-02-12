import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../utils/CrudAction'
import { User } from './List';
import { createOrEditRequest, getAllObjects, getOneObject } from '../../utils/ApiRequests';
import { refreshInput } from '../../utils/Handlers';

type AddUserDto = {
  username: string
  password: string
  email: string 
  roleId: number
}

export default function UserView(props: {action: CrudAction}) {
  const [action, setAction] = useState<CrudAction>(props.action)
  const [roles, setRoles] = useState<Array<any>>([]);
  const [requestedUser, setRequestedUser] = useState<User>()
  const [userData, setUserData] = useState<AddUserDto>({
    username: "",
    password: "",
    email: "",
    roleId: 0
  });

  const navigate = useNavigate();
  const { id } = useParams();
  
  const mapRoles = (roles: Array<any>) => {
    if (roles.length === 0) {
        return  <option value="0">Brak ról do wyboru</option>;
    }
    return roles.map(role => {
        return <option value={role.id}>{role.name}</option>
    })
  }

  const handleInputChange = (event: ChangeEvent<any>) => {
    refreshInput(event, userData, setUserData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userData);
    createOrEditRequest(action, userData, id, "users", navigate);
  };

  useEffect(() => {
    if (action != CrudAction.Create) {
      getOneObject(id, "users", setRequestedUser);
      getAllObjects("roles", setRoles);
    }
  }, []);

  useEffect(() => {
    if (requestedUser) {
      setUserData({
        ...userData,
        username: requestedUser.username,
        email: requestedUser.email,
        roleId: requestedUser.role.id
      })
    }
  },[requestedUser])

  return (
    <div className="container border rounded p-4 m-4">
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="username">Nazwa użytkownika:</label>
            <input type="text" name="username" id="username" className='form-control' placeholder='Nazwa użytkownika' onChange={handleInputChange} value={userData.username} disabled={action === CrudAction.View}/>
          </div>
          {action != CrudAction.View ? <div className='form-group col'>
            <label htmlFor="password">Hasło:</label>
            <input type="text" name="password" id="password" className='form-control' placeholder='Hasło' onChange={handleInputChange}/>
          </div> : null}
        </div>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="roleId">Rola:</label>
            <select className="form-select" name="roleId" id="roleId" onChange={handleInputChange} value={userData.roleId} disabled={action === CrudAction.View}>
              {mapRoles(roles)}
            </select>
          </div>
          <div className='form-group col'>
            <label htmlFor="email">E-mail:</label>
            <input type="email" name="email" id="email" className='form-control' placeholder='E-mail' onChange={handleInputChange} value={userData.email} disabled={action === CrudAction.View}/>
          </div>
        </div>
        {action === CrudAction.Create ? <input type="submit" value="Utwórz" className='btn btn-primary' /> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Zapisz" className='btn btn-primary' /> : null}
      </form>
    </div>
  )
}
