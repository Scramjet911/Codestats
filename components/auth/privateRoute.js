import React, { useEffect } from 'react';
import Router,{useRouter} from 'next/router';
import {isAuthenticated} from './index'

 export function ProtectRoute(Component) {
    return () => {
        const {user} = isAuthenticated();
        const router = useRouter()

        useEffect(() => {
            
            if (!isAuthenticated()) router.push("/")
        }, [isAuthenticated()])

        return (<Component {...arguments} />)
    }
}
export default ProtectRoute;