import React, {useState} from 'react';
import Sidebar from '../shared/Sidebar';
import ProviderGrid from '../shared/ProviderGrid';
import RechargeForm from '../shared/RechargeForm';
import LoginModal from '../shared/LoginModal';
import AddMoneyModal from '../shared/AddMoneyModal';
import MobileSidebar from '../shared/MobileSidebar';

export default function Home(){
  const [user, setUser] = useState(()=> JSON.parse(localStorage.getItem('fastag_user')||'null'));
  const [showLogin, setShowLogin] = useState(false);
  const [wallet, setWallet] = useState(0);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLogin(u){
    setUser(u);
    localStorage.setItem('fastag_user', JSON.stringify(u));
    setShowLogin(false);
  }

  function handleLogout(){
    setUser(null);
    localStorage.removeItem('fastag_user');
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar user={user} onLogout={handleLogout} onOpenLogin={()=>setShowLogin(true)} />
      <main className="flex-1 p-6">
        {/* Mobile top bar (visible on small screens) */}
        <div className="md:hidden mb-4">
          <div className="flex items-center justify-between">
            <button aria-label="open menu" onClick={()=>setMobileMenuOpen(true)} className="p-2 rounded bg-teal-800 text-white">
              ☰
            </button>
            <div className="text-base font-semibold">FASTag</div>
            <div className="flex items-center gap-2">
              <div className="text-sm bg-white/60 rounded-full px-2 py-1">₹{wallet}</div>
              <button onClick={()=>setShowAddMoney(true)} className="px-2 py-1 rounded bg-teal-600 text-white text-sm">Add</button>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-cyan-200 to-cyan-100 p-4 rounded-xl mb-6 shadow-inner">
          <div className="flex justify-between items-center">
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-slate-800">FASTag Recharge & Get Exciting Offers</h1>
              <p className="text-sm text-slate-600">Multiple Payment Option • Multiple Discounts • 24x7 Support</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/60 rounded-full px-3 py-1 text-sm flex items-center gap-2 shadow"> 
                <span className="text-teal-800">₹{wallet}</span>
              </div>
              <button className="px-4 py-2 rounded bg-teal-600 text-white" onClick={()=>setShowAddMoney(true)}>Add Money</button>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">👤</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-white p-6 rounded shadow">
            <ProviderGrid />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded shadow">
              <RechargeForm user={user} onRequireLogin={()=>setShowLogin(true)} onRecharge={(amt)=>setWallet(w=>w+amt)} />
            </div>

            <div className="mt-6 bg-white p-6 rounded shadow">
              <h3 className="font-semibold mb-4">My Offers</h3>
              <div className="text-sm text-slate-600">No offers currently. (placeholder)</div>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold mb-4">Help & FAQ</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded">What is FASTag?</div>
                <div className="p-4 bg-white rounded shadow-sm">How can I recharge my FASTag on Logiclead? <div className="text-sm text-slate-500 mt-2">Simply enter your vehicle/FASTag details, choose a recharge amount, select your payment method (UPI, card, net banking), and complete the payment.</div></div>
                <div className="p-4 bg-slate-50 rounded">What payment methods are accepted?</div>
                <div className="p-4 bg-white rounded">Is there any minimum recharge amount?</div>
                <div className="p-4 bg-slate-50 rounded">How long does it take for the recharge to reflect?</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showLogin && <LoginModal onClose={()=>setShowLogin(false)} onLogin={handleLogin} />}
      {showAddMoney && (
        <AddMoneyModal
          onClose={()=>setShowAddMoney(false)}
          onAdd={(amt)=>{
            setWallet(w=>w+amt);
          }}
        />
      )}
      {mobileMenuOpen && (
        <MobileSidebar
          onClose={()=>setMobileMenuOpen(false)}
          user={user}
          onOpenLogin={()=>setShowLogin(true)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
