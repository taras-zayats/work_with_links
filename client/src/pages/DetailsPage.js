import React, { useState,useCallback,useContext,useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import { AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import{LinkCard} from '../components/LinkCard'

export const DetailsPage = ()=>{
    const {userId} = useContext(AuthContext) 
    const {loading, request} = useHttp()
    const[link, setLink] = useState(null)
    const linkId = useParams().id

    const getLink = useCallback(
        async () => {
            try{
                const fetched = await request(`/api/link/${linkId}`,'GET',null,{
                    userid: userId
                })

                setLink(fetched)
            }catch(e){

            }
        },
        
        [userId, linkId, request],
    )
 
    useEffect(() => {
        getLink()
    }, [getLink])

    if(loading){
        return (<Loader/>)
    }

    console.log("link", link)
    
    return (
        <div>
            <h1>DetailsPage</h1>
            {!loading && link && <LinkCard link = {link}/>}
        </div>
    )
}