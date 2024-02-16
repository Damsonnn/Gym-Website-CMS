import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { CrudAction } from '../../../utils/CrudAction'
import { User } from './List';
import { createOrEditRequest, getAllObjects, getOneObject } from '../../../utils/ApiRequests';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'

type AddUserDto = {
  username: string
  password?: string
  email: string 
  roleId: number
}

export default function UserView(props: {action: CrudAction}) {
  const action = props.action
  const [roles, setRoles] = useState<Array<any>>([]);
  const [requestedUser, setRequestedUser] = useState<User>()
  const navigate = useNavigate();
  const { id } = useParams();

  const schema = yup.object().shape({
    username: yup.string().required().min(4).max(50),
    password: yup.string().optional()
    .when("password", {
      is: (value: string) => value?.length,
      then: (rule) => rule.min(4)
    })
    .when([], {
      is: () => props.action === CrudAction.Create,
      then: (rule) => rule.required()
    }),
    email: yup.string().required().email().max(50),
    roleId: yup.number().required()
  },
  [
    ["password", "password"]
  ]
  )

  const {register, handleSubmit, formState: { errors }, reset} = useForm<AddUserDto>({
    resolver: yupResolver(schema),
  });
  
  const mapRoles = (roles: Array<any>) => {
    if (roles.length === 0) {
        return  <option value="0">No roles to choose from</option>;
    }
    return roles.map(role => {
        return <option key={role.id} value={role.id}>{role.name}</option>
    })
  }

  const onSubmit = (data: AddUserDto) => {
    createOrEditRequest(action, data, id, "users", navigate);
  };

  useEffect(() => {
    if (action !== CrudAction.Create) getOneObject(id, "users", setRequestedUser);
    getAllObjects("roles", setRoles);
  }, []);

  useEffect(() => {
    if (requestedUser) {
      reset({
        username: requestedUser.username,
        password: "",
        email: requestedUser.email,
        roleId: requestedUser.role.id
      })
    }
  },[requestedUser])

  return (
    <div className="container border rounded p-4 m-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
          <div className='form-group col'>
            <label htmlFor="username">Username:</label>
            <input type="text" className={`form-control ${errors.username ? "input-invalid" : null}`} {...register("username")} placeholder='User' disabled={action === CrudAction.View}/>
            <p className="text-danger">{errors.username?.message}</p>
          </div>
          {action !== CrudAction.View ? <div className='form-group col'>
            <label htmlFor="password">Password: {action !== CrudAction.Create ? "(optional)" : null}</label>
            <input type="password" className={`form-control ${errors.password ? "input-invalid" : null}`} {...register("password")} placeholder='Password'/>
            <p className="text-danger">{errors.password?.message}</p>
          </div> : null}
        </div>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="roleId">Role:</label>
            <select className={`form-control ${errors.roleId ? "input-invalid" : null}`} {...register("roleId")} disabled={action === CrudAction.View}>
              <option value="" disabled selected>Select user role</option>
              {mapRoles(roles)}
            </select>
          </div>
          <div className='form-group col'>
            <label htmlFor="email">E-mail:</label>
            <input type="email" className={`form-control ${errors.email ? "input-invalid" : null}`} {...register("email")} placeholder='E-mail' disabled={action === CrudAction.View}/>
            <p className="text-danger">{errors.email?.message}</p>
          </div>
        </div>
        {action === CrudAction.Create ? <input type="submit" value="Create" className='btn btn-primary' /> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Save" className='btn btn-primary' /> : null}
      </form>
    </div>
  )
}
