import React, { useState, useEffect,useContext } from 'react'

import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook' 
import {AuthContext} from '../context/AuthContext'

export const AuthPage = ()=>{
    const auth = useContext(AuthContext)

    const {loading, request, error, clearError} = useHttp()

    const message = useMessage()

    const [form, setForm] = useState({
        email:'',
        password:''
    })

    useEffect(()=>{
        console.log('error', error)
        message(error)
        clearError()
    },[error, message,clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    },[])

    const changeHandler = event =>{
        setForm({...form, [event.target.name]:event.target.value})
    }

    const registerHendler = async() =>{
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        }catch(e){

        }
    }

    const loginHendler = async() =>{
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        }catch(e){

        }
    }

    return (
        <div className = 'row'> 
           <div className = 'col s6 offset-s3'>
                <h1>
                    Save links
                </h1>

                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Login</span>
                        <div>
                            <div className="input-field ">
                                <input value={form.email} onChange = {changeHandler}  placeholder="Enter email" id="email" type="email" className="validate yellow-input" name='email' />
                                <label htmlFor="email">email</label>
                            </div>

                            <div className="input-field ">
                                <input  value={form.password} onChange = {changeHandler}  placeholder="Enter password" id="Password" type="password" className="validate  yellow-input" name='password'/>
                                <label htmlFor="email">Password</label>
                            </div>

                         
                        </div>
                    </div>
                    <div className="card-action">
                        <button   onClick={loginHendler} disabled = {loading} className='btn yellow darken-4 come-in' >to come in</button>
                        <button onClick={registerHendler} disabled = {loading} className='btn gray  lighten-1 black-text'>registration</button>
                    </div>
                </div>
            </div>
        </div>
    )
}