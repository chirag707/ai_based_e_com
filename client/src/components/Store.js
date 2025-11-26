import React, { useState } from 'react'
import StoreItem from "./StoreItem"
import './css/Store.css'
import Footer from './Footer'
import Cookies from 'universal-cookie'
import { useHistory } from 'react-router-dom'

export default function Store({ items }) {
  const cookies = new Cookies()
  const name = cookies.get('username');
  console.log(name);
  const history = useHistory();
  
  return (
    <section className="store-page" data-testid="storePage">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="comp_name">Bitzz</h1>
        <ul>
          <li><a href="#" onClick={e => history.push('/orderdetails')}>My Orders</a></li>
          <li><a href="#" onClick={e => history.push('/')}>Log Out</a></li>
        </ul>
        <h1 className="welcome_msg">Welcome, {name}</h1>
      </nav>

      {/* Main Content */}
      <div className="store-container">
        <h2 className="store-header">Ask Alan for 'Help'</h2>
        
        {/* Items Grid */}
        <div className="items-grid">
          {items.map(item => (
            <StoreItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      <Footer />
    </section>
  )
}
