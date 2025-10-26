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

  // FAQ state for accordion
  const [faqOpen, setFaqOpen] = useState(null);

  // Responsive: Only show Add Money in banner on md+ screens
  // Only show Add button in mobile top bar on small screens
  return (
    <div className="min-h-screen flex">
      <Sidebar user={user} onLogout={handleLogout} onOpenLogin={()=>setShowLogin(true)} />
      <main className="flex-1 p-2 sm:p-4 md:p-6">
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-slate-800">FASTag Recharge & Get Exciting Offers</h1>
              <p className="text-sm text-slate-600">Multiple Payment Option • Multiple Discounts • 24x7 Support</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/60 rounded-full px-3 py-1 text-sm flex items-center gap-2 shadow"> 
                <span className="text-teal-800">₹{wallet}</span>
              </div>
              <button className="px-4 py-2 rounded bg-teal-600 text-white hidden md:block" onClick={()=>setShowAddMoney(true)}>Add Money</button>
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
            <div className="bg-white p-0 sm:p-6 rounded shadow">
              <div className="max-w-xl mx-auto w-full">
                <RechargeForm user={user} onRequireLogin={()=>setShowLogin(true)} onRecharge={(amt)=>setWallet(w=>w+amt)} />
              </div>
            </div>

            <div className="mt-6 bg-white p-6 rounded shadow">
              <h3 className="font-semibold mb-4">My Offers</h3>
              <div className="text-sm text-slate-600">No offers currently. (placeholder)</div>
            </div>
          </div>
        </div>

        {/* FAQ section now always full width at bottom */}
        <div className="mt-6">
          <div className="bg-white p-4 sm:p-6 rounded shadow max-w-3xl mx-auto">
            <h3 className="font-semibold mb-4">Help & FAQ</h3>
            <div className="space-y-2">
              {[
                {
                  q: 'What is FASTag?',
                  a: 'FASTag is an electronic toll collection system in India, operated by the NHAI. It uses RFID technology for making toll payments directly from the prepaid or savings account linked to it.'
                },
                {
                  q: 'How can I recharge my FASTag on Logiclead?',
                  a: 'Simply enter your vehicle/FASTag details, choose a recharge amount, select your payment method (UPI, card, net banking), and complete the payment.'
                },
                {
                  q: 'What payment methods are accepted?',
                  a: 'We accept UPI, credit/debit cards, net banking, and select wallets.'
                },
                {
                  q: 'Is there any minimum recharge amount?',
                  a: 'The minimum recharge amount is ₹100.'
                },
                {
                  q: 'How long does it take for the recharge to reflect?',
                  a: 'Most recharges are instant, but in rare cases it may take up to 30 minutes.'
                }
              ].map((item, i) => (
                <div key={i} className={
                  'rounded transition-all ' +
                  (faqOpen===i ? 'bg-white shadow-sm' : (i%2===0 ? 'bg-slate-50' : 'bg-white'))
                }>
                  <button
                    className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
                    onClick={()=>setFaqOpen(faqOpen===i ? null : i)}
                    aria-expanded={faqOpen===i}
                    aria-controls={`faq-panel-${i}`}
                  >
                    <span className="font-medium">{item.q}</span>
                    <span className="ml-2 text-xl text-teal-700">{faqOpen===i ? '−' : '+'}</span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    className={
                      'overflow-hidden transition-all duration-300 px-4 pb-2 text-sm text-slate-600' +
                      (faqOpen===i ? ' max-h-40 opacity-100' : ' max-h-0 opacity-0')
                    }
                    style={{
                      maxHeight: faqOpen===i ? 200 : 0,
                      opacity: faqOpen===i ? 1 : 0,
                      transition: 'all 0.3s cubic-bezier(.4,0,.2,1)'
                    }}
                  >
                    {faqOpen===i && <div>{item.a}</div>}
                  </div>
                </div>
              ))}
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
