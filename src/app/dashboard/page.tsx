import React from 'react';
import { auth} from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
const DashboardPage=async ()=>{
    const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
});
    console.log('session',session);
    if(!session){
        //return <div>Not Authenticated</div>
        redirect('/auth/signin'); //protected route
    }
    return (
        <div>
            Welcome,{session.user.name}!</div>
    )
     console.log(session);
}

export default DashboardPage