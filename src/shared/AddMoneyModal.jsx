import React, {useState} from 'react';

export default function AddMoneyModal({onClose, onAdd}){
  const presets = [500,1000,1500,2000];
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');

  function pick(a){
    setSelected(a);
    setAmount(String(a));
  }

  function proceed(e){
    e.preventDefault();
    const val = Number(amount || selected || 0);
    if(!val || val <= 0){
      alert('Please enter a valid amount');
      return;
    }
    // simple validation for payment method (can be expanded)
    if(!method){
      alert('Please select a payment method');
      return;
    }
    onAdd && onAdd(val, method);
    onClose && onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Add Money</h3>
          <button onClick={onClose} className="text-slate-500">✕</button>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-4">
          {presets.map(p => (
            <button key={p}
              onClick={()=>pick(p)}
              className={`py-2 rounded border ${Number(amount)===p ? 'border-green-500 bg-white' : 'border-slate-200 bg-white'}`}>
              ₹{p}
            </button>
          ))}
        </div>

        <div className="text-center text-sm text-slate-500 mb-3">OR</div>

        <form onSubmit={proceed}>
          <label className="block text-sm mb-1">Enter Amount</label>
          <input
            type="number"
            min="1"
            className="w-full border rounded p-2 mb-3"
            placeholder="Enter amount"
            value={amount}
            onChange={e=>{setAmount(e.target.value); setSelected(null);}}
          />

          <label className="block text-sm mb-1">Payment Method</label>
          <select className="w-full border rounded p-2 mb-4" value={method} onChange={e=>setMethod(e.target.value)}>
            <option value="">Select Method</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="netbanking">Netbanking</option>
            <option value="wallet">Wallet (External)</option>
          </select>

          <button type="submit" className="w-full bg-teal-800 text-white p-3 rounded">Proceed</button>
        </form>
      </div>
    </div>
  )
}
