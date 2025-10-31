import { headers} from "next/headers";
import {auth} from "@/lib/auth";
import { redirect} from "next/navigation";
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
});
    console.log('session',session);
    if(session){
        redirect('/dashboard'); //protected route
    }

  return <div>{children}</div>;
}