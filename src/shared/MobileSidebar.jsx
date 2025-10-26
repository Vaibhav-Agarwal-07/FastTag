import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileSidebar({onClose,user,onOpenLogin,onLogout}){
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <aside className="absolute left-0 top-0 bottom-0 w-64 bg-teal-800 text-white p-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">👤</div>
          <div>
            <div className="font-semibold">{user ? user.name : 'Guest'}</div>
            <div className="text-sm text-teal-200">{user ? user.email : 'Please login'}</div>
          </div>
        </div>

        <nav className="space-y-3">
          <Link to="/" onClick={onClose} className="block p-3 bg-teal-700 rounded">Home</Link>
          <Link to="/wallet" onClick={onClose} className="block p-3 hover:bg-teal-700 rounded">Recharge History</Link>
          <button onClick={()=>{onClose(); onOpenLogin && onOpenLogin();}} className="w-full text-left p-3 hover:bg-teal-700 rounded">Login / Signup</button>
          <button className="w-full text-left p-3 hover:bg-teal-700 rounded">Offers</button>
          <button className="w-full text-left p-3 hover:bg-teal-700 rounded">Help & Support</button>
          {user && <button onClick={()=>{onClose(); onLogout && onLogout();}} className="w-full text-left p-3 hover:bg-teal-700 rounded">Logout</button>}
        </nav>
      </aside>
    </div>
  )
}
