import React, {useCallback,useContext,useEffect } from 'react'
import {useParams, useHistory} from 'react-router-dom'
import { AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'


export const DeletePages = () =>{
    const {userId} = useContext(AuthContext) 
    const linkId = useParams().id
    const history = useHistory()
    const {loading, request} = useHttp()
    

    const deleteLink = useCallback(
        async () => {
            try{
                const res = await request(`/api/link/delete/${linkId}`,'POST',null,{
                    userid: userId,
                    linkid:linkId
                })

                history.push('/links')
            }catch(e){

            }
        },
        
        [userId, linkId, request],
    )
 
    useEffect(() => {
        deleteLink()
    }, [deleteLink])

    if(loading){
        return (<Loader/>)
    }
    return(
        <>
        Delete DeletePages
        </>
    )
}