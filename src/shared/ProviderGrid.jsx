import React, {useState, useMemo} from 'react';

export default function ProviderGrid(){
  const all = [
    'Indian Highways Management', 'IndusInd Bank','Bank of Baroda','Axis Bank',
    'IDFC FIRST Bank','HDFC Bank','Kotak Mahindra Bank','Equitas','IDBI Bank','IOB',
    'Jammu and Kashmir Bank','Karnataka Bank','Paytm Payments Bank','State Bank of India','Federal Bank','ICICI Bank'
  ];

  const [q, setQ] = useState('');

  const banks = useMemo(()=>{
    if(!q.trim()) return all;
    const term = q.toLowerCase();
    return all.filter(b=>b.toLowerCase().includes(term));
  },[q]);

  return (
    <div>
      <div className="text-center mb-4">
        <img src="" alt="logo" className="mx-auto mb-2 h-8" />
        <h3 className="font-semibold">Select your FasTag Providers</h3>
        <div className="mt-3 max-w-md mx-auto">
          <div className="flex items-center border rounded-full overflow-hidden shadow-sm bg-white">
            <input
              className="flex-1 p-3 rounded-l-full outline-none"
              placeholder="Search Providers..."
              value={q}
              onChange={e=>setQ(e.target.value)}
            />
            <div className="px-3 text-slate-500">🔍</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {banks.map(b => (
          <div key={b} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-semibold">{b.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
            <div className="text-sm font-medium">{b}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
