import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import{LinksPage} from './pages/LinksPage'
import{CreatePage} from './pages/CreatePage'
import{DetailsPage} from './pages/DetailsPage'
import{AuthPage} from './pages/AuthPage'
import {DeletePages} from './pages/DeletePages'

export const useRouts = isAuthenticated =>{
    if(isAuthenticated){
        return(
            <Switch>
                <Route path='/links' exact>
                    <LinksPage/>
                </Route>
                <Route path='/create' exact>
                    <CreatePage/>
                </Route>
                <Route path='/detail/:id' >
                    <DetailsPage/>
                </Route>
                <Route path='/delete/:id' >
                    <DeletePages/>
                </Route>
                <Redirect to='/create'></Redirect>
            </Switch>
        )
    }else{
        return(
            <Switch>
                <Route path='/' exact>
                    <AuthPage/>
                </Route>
                <Redirect to='/'></Redirect>
            </Switch>
        )
    }
}