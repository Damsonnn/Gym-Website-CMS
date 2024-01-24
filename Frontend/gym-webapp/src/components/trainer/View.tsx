﻿import React from 'react'
import "../../assets/stylesheets/View.css"
import { CrudAction } from '../../utils/CrudAction'

export default function TrainerView(props: {action: CrudAction}) {
  return (
    <div className='view-container'>
        <form action="submit" className='view-form'>
            <label htmlFor="first_name">Imię:</label>
            <input type="text" name='first_name' />
            <label htmlFor="last_name">Nazwisko:</label>
            <input type="text" name='last_name' />
            <label htmlFor="age">Wiek:</label>
            <input type="number" name='age' />
            <label htmlFor="about">Opis:</label>
            <input type="text" name='about' className='about-input'/>
            <label htmlFor="facebook">Facebook:</label>
            <input type="text" name='facebook' />
            <label htmlFor="instagram">Instagram:</label>
            <input type="text" name='instagram' />
            <label htmlFor="twitter">Twitter:</label>
            <input type="text" name='twitter' />
            <div>
                <label htmlFor="active">Aktywny:</label>
                <input type="checkbox" name='active' />
            </div>
            
            <input type="submit" value="Zapisz" />
        </form>
    </div>
  )
}
