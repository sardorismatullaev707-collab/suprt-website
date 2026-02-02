import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import UseCases from './components/UseCases'
import Demo from './components/Demo'
import Offer from './components/Offer'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

export default function App() {
  return (
    <div className="page-root">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <UseCases />
        <Demo />
        <Offer />
        <FAQ />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
