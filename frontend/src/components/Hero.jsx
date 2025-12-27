import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Visualize
          <span className="text-primary-500"> Algorithms</span>
          <br />
          in Motion
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Watch algorithms come to life with interactive visualizations. Learn how sorting, searching, graphs, and dynamic programming algorithms work.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-semibold flex items-center justify-center gap-2 transition-colors">
            <Play size={20} />
            Start Learning
          </button>
          <button className="px-8 py-3 rounded-lg bg-dark-700 hover:bg-dark-600 text-white font-semibold flex items-center justify-center gap-2 border border-primary-500/30 transition-colors">
            Learn More
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
