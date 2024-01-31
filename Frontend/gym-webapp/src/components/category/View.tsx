import { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { useParams } from 'react-router';
import { CrudAction } from '../../utils/CrudAction'
import axios from 'axios';
import { Category } from './List';

const config = {
  headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  'Content-Type': 'application/json', }
};

export default function CategoryView(props: {action: CrudAction}) {
  const [action, setAction] = useState<CrudAction>(props.action)
  const { id } = useParams();

  const getCategory = async () => {
    if (action != CrudAction.Create){
       
    await axios.get(`http://localhost:8080/api/categories/${id}`, config).then(response =>{
            console.log(response)
            if (response.status === 200) {
                return response.data as Category
      }
    })
    return {
      id:0,
      name:"elo",
      active: true
    } as Category;
    }

  const [categoryData, setCategoryData] = useState<Category>(getCategory());

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  // const getDefaultValue = (event: ChangeEvent<HTMLInputElement>) => {
  //   event.target.value = categoryData
  //   const { name, value } = event.target;
  //   setCategoryData({ ...categoryData, [name]: value });
  // };


  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (action === CrudAction.Create){
  //     try {
  //       const response = await axios.post('http://localhost:8080/api/auth/login', loginData);

  //       if (response.status === 201) {
  //         console.log('Login successful');
  //         console.log(response.data);
  //         sessionStorage.setItem("token", response.data.token);
  //       } else {
  //         console.error('Login failed');
  //       }
  //     } catch (error) {
  //       console.error('Error during login:', error);
  //     }
            
  // }
  // }


  return (
    <div className="container border rounded p-4 mt-4">
      <form>
        <div className='row mb-3'>
          <div className='form-group col'>
            <label htmlFor="name">Nazwa kategorii:</label>
            <input type="text" name="name" id="name" className='form-control' placeholder='Kategoria' onChange={handleInputChange} value={categoryData.name}/>
          </div>
        </div>
        <div className='form-check mb-3'>
          <label className="form-check-label" htmlFor="active">Wyświetlaj na stronie głównej</label>
          <input className="form-check-input" type="checkbox" name="active" id="active" onChange={handleInputChange} value={categoryData.active ? 1 : 0}/>
        </div>
        {action === CrudAction.Create ? <input type="submit" value="Utwórz" className='btn btn-primary'/> : null}
        {action === CrudAction.Edit ? <input type="submit" value="Zapisz" className='btn btn-primary'/> : null}
      </form>
    </div>
  )
}
