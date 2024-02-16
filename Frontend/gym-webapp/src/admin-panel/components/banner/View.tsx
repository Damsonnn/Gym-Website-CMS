import { useEffect } from 'react'
import { CrudAction } from "../../../utils/CrudAction";
import { useNavigate, useParams } from "react-router";
import { createOrEditRequest, getOneObject } from "../../../utils/ApiRequests";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'


type BannerDto = {
  title: string
  body: string
  active: boolean
}

export default function BannerView(props: {action: CrudAction}) {
  const action = props.action
  const navigate = useNavigate();
  const { id } = useParams();
  
  const schema = yup.object().shape({
    title: yup.string().required().min(3).max(200),
    body: yup.string().required().min(5).max(500),
    active: yup.boolean().required()
  });
  
  const {register, handleSubmit, formState: { errors }, reset} = useForm<BannerDto>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: BannerDto) => {
    createOrEditRequest(action, data, id, "banners", navigate);
  };

  useEffect(() => {
    if (action !== CrudAction.Create) getOneObject(id, "banners", reset);
  }, []);

  return (
    <div className="container border rounded p-4 mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='form-group col'>
              <label htmlFor="title">Title:</label>
              <input type="text" className={`form-control ${errors.title ? "input-invalid" : null}`} placeholder='Title' {...register("title")} disabled={action === CrudAction.View}/>
              <p className="text-danger">{errors.title?.message}</p>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col'>
              <label htmlFor="body">Text under title:</label>
              <input type="text" className={`form-control ${errors.body ? "input-invalid" : null}`} placeholder='Text' {...register("body")} disabled={action === CrudAction.View}/>
              <p className="text-danger">{errors.body?.message}</p>
            </div>
          </div>
          <div className='form-check mb-3'>
            <label className="form-check-label" htmlFor="active">Show on the main page</label>
            <input className="form-check-input" type="checkbox" {...register("active")} disabled={action === CrudAction.View}/>
          </div>
          {action === CrudAction.Create ? <input type="submit" value="Create" className='btn btn-primary' /> : null}
          {action === CrudAction.Edit ? <input type="submit" value="Save" className='btn btn-primary' /> : null}
        </form>
    </div>
  )
}
