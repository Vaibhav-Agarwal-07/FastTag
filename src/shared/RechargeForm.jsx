import React, {useState} from 'react';

export default function RechargeForm({user,onRequireLogin,onRecharge}){
  const [vehicle,setVehicle] = useState('');
  const [amount,setAmount] = useState(300);
  const [msg,setMsg] = useState('');

  function pay(e){
    e.preventDefault();
    if(!user){
      onRequireLogin && onRequireLogin();
      return;
    }
    if(!vehicle.trim()){
      setMsg('Please enter vehicle number.');
      return;
    }
    setMsg('Processing...');
    setTimeout(()=>{
      onRecharge(Number(amount));
      setMsg('Recharge successful!');
      setVehicle('');
    },800);
  }

  return (
    <form onSubmit={pay}>
      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-600">Vehicle Number</label>
        <input className="w-full border rounded p-2 mt-1" value={vehicle} onChange={e=>setVehicle(e.target.value)} placeholder="MH12AB1234" />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-600">Select Provider</label>
        <select className="w-full border rounded p-2 mt-1">
          <option>Indian Highways Management</option>
          <option>HDFC Bank</option>
          <option>State Bank of India</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-600">Amount (₹)</label>
        <input type="number" className="w-full border rounded p-2 mt-1" value={amount} onChange={e=>setAmount(e.target.value)} min="10" />
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-2 rounded bg-teal-600 text-white">Proceed</button>
        <button type="button" className="px-4 py-2 rounded border" onClick={()=>{setVehicle(''); setAmount(300); setMsg('')}}>Reset</button>
      </div>

      {msg && <div className="mt-3 text-sm text-teal-700">{msg}</div>}
    </form>
  )
}
