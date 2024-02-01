import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../utils/CrudAction'
import { User } from './List';
import { createOrEditRequest, getOneObject } from '../../utils/ApiRequests';
import { refreshInput } from '../../utils/Handlers';

export default function UserView(props: {action: CrudAction}) {
  const [action, setAction] = useState<CrudAction>(props.action)
  const [userData, setUserData] = useState<User>({
    id: 0,
    username: "",
    password: "",
    email: "",
    role: {
      name: "",
      description: ""
    }
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const getUser = () => {
    if (action != CrudAction.Create) {
      getOneObject(id, "users", setUserData);
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    refreshInput(event, userData, setUserData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrEditRequest(action, userData, id, "users", navigate);
  };

  useEffect(() => {
    getUser()
  }, []);

  return (
    <div className="container border rounded p-4 m-4">
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="username">Nazwa użytkownika:</label>
            <input type="text" name="username" id="username" className='form-control' placeholder='Nazwa użytkownika' onChange={handleInputChange} value={userData.username} disabled={action === CrudAction.View}/>
          </div>
          <div className='form-group col'>
            <label htmlFor="password">Hasło:</label>
            <input type="text" name="password" id="password" className='form-control' placeholder='Hasło' onChange={handleInputChange} value={userData.password} disabled={action === CrudAction.View}/>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor="email">E-mail:</label>
          <input type="email" name="email" id="email" className='form-control' placeholder='E-mail' onChange={handleInputChange} value={userData.email} disabled={action === CrudAction.View}/>
        </div>
        {action === CrudAction.Create ? <input type="submit" value="Utwórz" className='btn btn-primary' /> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Zapisz" className='btn btn-primary' /> : null}
      </form>
    </div>
  )
}
