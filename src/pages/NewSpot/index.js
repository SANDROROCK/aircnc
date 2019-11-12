import React ,{useState,useMemo}from 'react';

import camera from '../../assets/camera.svg';

import api from '../../services/api';

import './style.css';

export default function NewSpot({history}){

    const[thumbnail,setThumbnail] = useState(null);
    const[company,setCompany] = useState('');
    const[techs,setTechs] = useState('');
    const[price,setPrice] = useState('');

    //exibindo um preview sempre que o thumbnail mudar 
    const preview = useMemo(()=>{
        return thumbnail ? URL.createObjectURL(thumbnail):null;
    },[thumbnail]);

   


    async function handleSubmit(event){

        //prevenindo de o form jogar o usuario para uma nova tela
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');
    
        data.append('thumbnail',thumbnail);
        data.append('company',company);
        data.append('techs',techs);
        data.append('price',price);

        

        await api.post('/spots', data ,{
            headers: { user_id }
        })

        history.push('/Dashboard');

    }

    return (
        <form onSubmit ={handleSubmit}>
        <label 
        id ="thumbnail" 
        style={{backgroundImage:`url(${preview})`}}
        className={thumbnail ?'hasthumbnail':''}    
        >
            <input type="file" onChange ={event =>setThumbnail(event.target.files[0])}/>
            <img src={camera} alt="Imagem do spot"/>
        </label>
            <label htmlFor="company">Empresa *</label>
            <input
             id="company"
             placeholder="Sua empresa incrivel"
             value={company}
             onChange={event=>setCompany(event.target.value)}
             />
              <label htmlFor="company">Tecnologias * <span>(separadas por virgulas)</span></label>
              <input
             id="techs"
             placeholder="Quais tecnologias usam?"
             value={techs}
             onChange={event=>setTechs(event.target.value)}
             />
              <label htmlFor="company">Valor da Diária <span>(em branco para gratuito)</span></label>
              <input
             id="techs"
             placeholder="Valor cobrado por dia?"
             value={price}
             onChange={event=>setPrice(event.target.value)}
             />
             <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}