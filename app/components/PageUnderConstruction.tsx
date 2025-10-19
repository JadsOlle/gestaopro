'use client'

import { Construction } from 'lucide-react'
import Link from 'next/link'

interface PageUnderConstructionProps {
  title: string
  description: string
  features?: string[]
}

export default function PageUnderConstruction({ title, description, features }: PageUnderConstructionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="bg-yellow-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-12 h-12 text-yellow-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600 mb-8">{description}</p>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">🚀 Funcionalidades Planejadas</h2>
            {features && features.length > 0 ? (
              <ul className="text-left space-y-2 text-gray-700">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Esta página está sendo desenvolvida e em breve estará disponível.</p>
            )}
          </div>

          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Voltar ao Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

