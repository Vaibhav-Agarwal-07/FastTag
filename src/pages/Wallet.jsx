import React from 'react';
import Sidebar from '../shared/Sidebar';
export default function Wallet(){
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Wallet History</h2>
          <p className="text-sm text-slate-600 mt-2">This is a placeholder for wallet history entries.</p>
        </div>
      </main>
    </div>
  )
}
