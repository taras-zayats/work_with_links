import React ,{useState, useEffect, useContext}from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = ()=>{
    const history =  useHistory()

    const auth = useContext(AuthContext)
    const{request} = useHttp()  
    const [link, setLink] = useState('')
    const [text, setText]  = useState('')

    const pressHendler = async event=>{
            try{
                const data = await request('/api/link/generate', 'POST', {from:link, text}, {
                    authorization: `Bearer ${auth.token}`,
                    userid:auth.userId
                }) 
                
                history.push(`/detail/${data.link._id}`)
                }catch(e){

            }
        
    }
    
    
    useEffect(()=>{
        window.M.updateTextFields()
    },[])


    return (
        <div className='row'>
            <div className='col s8 offst-s2'>
                <h1>CreatePage</h1>
                <div className="input-field ">
                    <input value={link} 
                       
                        onChange = {e=>setLink(e.target.value)}  
                        placeholder="Enter link" 
                        id="link" 
                        type="text" 
                        className="validate yellow-input" 
                        name='link' />
                    <label htmlFor="link">Enter link</label>
                </div>

                <div className="input-field ">
                    <input value={text} 
                        
                        onChange = {e=>setText(e.target.value)}  
                        placeholder="Enter description" 
                        id="text" 
                        type="text" 
                        className="validate yellow-input" 
                        name='text' />
                    <label htmlFor="link">Enter description</label>
                </div>

                <a  onClick={pressHendler} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
            </div>
        </div>
    )
}