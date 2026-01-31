import React, { use } from 'react';
import { AuthContext } from '../Contex/AuthContext/AuthContext';


const UseAuth = () => {
    const authInfo = use(AuthContext)
    return authInfo

};

export default UseAuth;