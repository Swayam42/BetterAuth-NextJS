import Link from "next/link";
import Logout from "./logout";
import "./navbar-style.css";

export default function Navbar() {
  return (
    <nav className='navbar'>
      <Link href={'/'} className='navbar-logo'>OAuth-Test</Link>
      <ul className='navbar-links'>
        <li><Link href={'/auth/signin'} className='navbar-link'>Sign In</Link></li>
        <li><Link href='/auth/signup' className='navbar-link'>Sign Up</Link></li>
        <li><Link href='/dashboard' className='navbar-link'>Dashboard</Link></li>
        <li><Logout/></li>
      </ul>
    </nav>
  );
}
