import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="border-t border-white/10 mt-24 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold gradient-text mb-4">AlgoVis</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Making algorithms visual and interactive for better learning and understanding.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Algorithms</h4>
            <ul className="space-y-2">
              {['Sorting', 'Searching', 'Graphs', 'DP'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Documentation', 'Blog', 'Tutorials', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Privacy', 'Terms', 'License', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 py-8">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-6 mb-6"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg glass hover:border-primary-400/50 text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </motion.a>
              )
            })}
          </motion.div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
              Made with <Heart size={16} className="text-red-500" /> by Ahmed Haj Hassine
            </p>
            <p className="text-gray-600 text-xs mt-2">
              © {currentYear} AlgoVis. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
