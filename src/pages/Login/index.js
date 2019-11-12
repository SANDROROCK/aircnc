import React,{useState} from 'react';
import Api from '../../services/api';

export default function Login( {history}){


    const[email,setEmail]=useState('')

   async function handleSubmit(event) {
    event.preventDefault();
    const response = await Api.post('/users',email);

    const { _id } = response.data;
    console.log(response);

    localStorage.setItem('user',_id);
    history.push('/Dashboard');
  }
    return(
        <>
        <p>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa. </p>

        <form onSubmit={handleSubmit}>

          <label htmlFor="email"></label>
          <input
            type="text"
            id="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={event=>setEmail(event.target.value)}
          />
          <button className="btn">Entrar</button>
        </form>
      
      </>
    )
}