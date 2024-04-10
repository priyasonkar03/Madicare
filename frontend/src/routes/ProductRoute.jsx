// eslint-disable react/prop-types
import {useContext} from 'react'
// import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext'

const ProductRoute = ({children , allowedRoles}) => {
    
    const {token , role}= useContext(authContext)
    const isAllowed = allowedRoles.includes(role)
    const accessibleRoute = token && isAllowed ? children :<Navigate to='/login'
    replace={true}/>
    
    return accessibleRoute
}

export default ProductRoute