import React, {useState} from 'react';

export default function LoginModal({onClose,onLogin}){
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');

  function submit(e){
    e.preventDefault();
    const user = {email, name: name || email.split('@')[0]};
    onLogin && onLogin(user);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded shadow p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Login</h3>
          <button onClick={onClose} className="text-slate-500">✕</button>
        </div>
        <form onSubmit={submit}>
          <input className="w-full border rounded p-2 mb-3" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="w-full border rounded p-2 mb-3" placeholder="Name (optional)" value={name} onChange={e=>setName(e.target.value)} />
          <button className="w-full bg-teal-600 text-white p-2 rounded">Continue</button>
        </form>
      </div>
    </div>
  )
}
