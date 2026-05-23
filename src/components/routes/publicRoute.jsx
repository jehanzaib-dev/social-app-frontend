import {useContext} from 'react';
import {AuthContext} from '../../context/authContext.js';
import {Navigate} from 'react-router-dom';

export default function PublicRoute({children}){
	const {user}=useContext(AuthContext);

	if(user){
		return <Navigate to="/home"/>
	}
	return children;
}