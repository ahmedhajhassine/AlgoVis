import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AlgorithmGrid from './components/AlgorithmGrid'
import AlgorithmVisualizer from './components/AlgorithmVisualizer'
import Footer from './components/Footer'

export default function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      <Navbar />
      
      {selectedAlgorithm ? (
        <AlgorithmVisualizer 
          algorithm={selectedAlgorithm}
          onBack={() => setSelectedAlgorithm(null)}
        />
      ) : (
        <>
          <Hero />
          <AlgorithmGrid onSelectAlgorithm={setSelectedAlgorithm} />
        </>
      )}
      
      <Footer />
    </div>
  )
}
