import React from 'react'

export const LinkCard = ({link}) =>{
   console.log('LinkCard' , link)
    return(
        <div className="row">
            <div className="col s12 m6">
                <div className="card ">
                    <h2>Link</h2>
                        <ul  className="card-content" id = 'detali'>
                            <li>text: {link.text}</li>
                            <li>from <a href = {link.from} target = '_blank' rel= 'noopener noreferrer'>{link.from}</a></li>
                            <li>date <strong>{new Date(link.date).toLocaleDateString()}</strong></li>
                        </ul>   
                </div>
            </div>
        </div>
    )
}