import React from 'react'
import {Link} from 'react-router-dom'

export const LinksList = ({links}) =>{
    
    if(!links.length){
         return <p>There are  not links</p>
    }
    console.log(links)

    return(
        <table className="table">
        <thead>
          <tr>
              <th>№</th>
              <th>from</th>
              <th>text</th>
              <th>open</th>
              <th>delete</th>
          </tr>
        </thead>

        <tbody>

            {links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index+1}</td>
                        <td>{link.from}</td>
                        <td>{link.text}</td>
                        <td><Link to = {`/detail/${link._id}`} ><p className="waves-effect waves-light btn-small">Open</p></Link></td>
                        <td><Link to = {`/delete/${link._id}`} ><p className="red-effect red red-light btn-small">Delete</p></Link></td>
                    </tr>
                )
            })}
          
        </tbody>
      </table>
    )
}