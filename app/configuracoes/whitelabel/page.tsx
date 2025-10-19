'use client'
import { useState } from 'react'
import { Palette, Upload, Eye, Save, RotateCcw } from 'lucide-react'

export default function WhiteLabelPage() {
  const [config, setConfig] = useState({
    systemName: 'Sistema de Gestão',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#10B981',
    logo: null as string | null,
  })

  const [preview, setPreview] = useState(false)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setConfig({ ...config, logo: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // Aqui você salvaria as configurações no banco de dados
    window.alert('Configurações salvas com sucesso!')
  }

  const handleReset = () => {
    setConfig({
      systemName: 'Sistema de Gestão',
      primaryColor: '#3B82F6',
      secondaryColor: '#8B5CF6',
      accentColor: '#10B981',
      logo: null,
    })
  }

  const presetColors = [
    { name: 'Azul Padrão', primary: '#3B82F6', secondary: '#8B5CF6', accent: '#10B981' },
    { name: 'Verde Empresarial', primary: '#10B981', secondary: '#059669', accent: '#34D399' },
    { name: 'Roxo Moderno', primary: '#8B5CF6', secondary: '#7C3AED', accent: '#A78BFA' },
    { name: 'Laranja Vibrante', primary: '#F59E0B', secondary: '#D97706', accent: '#FBBF24' },
    { name: 'Vermelho Corporativo', primary: '#EF4444', secondary: '#DC2626', accent: '#F87171' },
    { name: 'Ciano Tech', primary: '#06B6D4', secondary: '#0891B2', accent: '#22D3EE' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">White Label</h1>
            <p className="text-gray-600">Personalize a identidade visual do sistema</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setPreview(!preview)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              {preview ? 'Ocultar' : 'Visualizar'} Preview
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Salvar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configurações */}
          <div className="space-y-6">
            {/* Nome do Sistema */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-600" />
                Nome do Sistema
              </h2>
              <input
                type="text"
                value={config.systemName}
                onChange={(e) => setConfig({ ...config, systemName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o nome do sistema"
              />
            </div>

            {/* Logo */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                Logo do Sistema
              </h2>
              <div className="space-y-4">
                {config.logo && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                    <img src={config.logo} alt="Logo" className="max-h-32 object-contain" />
                  </div>
                )}
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">Clique para fazer upload</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG ou SVG (máx. 2MB)</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Cores Personalizadas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Cores Personalizadas</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor Primária
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="w-20 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor Secundária
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={config.secondaryColor}
                      onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                      className="w-20 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      value={config.secondaryColor}
                      onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor de Destaque
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={config.accentColor}
                      onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                      className="w-20 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      value={config.accentColor}
                      onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Paletas Pré-definidas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Paletas Pré-definidas</h2>
              <div className="grid grid-cols-2 gap-3">
                {presetColors.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => setConfig({
                      ...config,
                      primaryColor: preset.primary,
                      secondaryColor: preset.secondary,
                      accentColor: preset.accent,
                    })}
                    className="border-2 border-gray-200 rounded-lg p-3 hover:border-blue-500 transition text-left"
                  >
                    <div className="flex gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: preset.secondary }}
                      />
                      <div
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: preset.accent }}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-900">{preset.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Botão Resetar */}
            <button
              onClick={handleReset}
              className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Restaurar Padrão
            </button>
          </div>

          {/* Preview */}
          {preview && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-6">Preview</h2>
                
                {/* Header Preview */}
                <div
                  className="rounded-lg p-4 mb-4"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <div className="flex items-center gap-3">
                    {config.logo ? (
                      <img src={config.logo} alt="Logo" className="h-10 object-contain bg-white rounded px-2" />
                    ) : (
                      <div className="bg-white rounded px-3 py-2">
                        <span className="font-bold text-gray-900">LOGO</span>
                      </div>
                    )}
                    <h3 className="text-white font-bold text-lg">{config.systemName}</h3>
                  </div>
                </div>

                {/* Buttons Preview */}
                <div className="space-y-3">
                  <button
                    className="w-full text-white px-4 py-3 rounded-lg font-medium"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    Botão Primário
                  </button>
                  <button
                    className="w-full text-white px-4 py-3 rounded-lg font-medium"
                    style={{ backgroundColor: config.secondaryColor }}
                  >
                    Botão Secundário
                  </button>
                  <button
                    className="w-full text-white px-4 py-3 rounded-lg font-medium"
                    style={{ backgroundColor: config.accentColor }}
                  >
                    Botão de Destaque
                  </button>
                </div>

                {/* Cards Preview */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div
                    className="rounded-lg p-4 text-white"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <div className="text-2xl font-bold">150</div>
                    <div className="text-sm opacity-90">Total</div>
                  </div>
                  <div
                    className="rounded-lg p-4 text-white"
                    style={{ backgroundColor: config.secondaryColor }}
                  >
                    <div className="text-2xl font-bold">85</div>
                    <div className="text-sm opacity-90">Ativos</div>
                  </div>
                  <div
                    className="rounded-lg p-4 text-white"
                    style={{ backgroundColor: config.accentColor }}
                  >
                    <div className="text-2xl font-bold">65</div>
                    <div className="text-sm opacity-90">Novos</div>
                  </div>
                </div>

                {/* Badges Preview */}
                <div className="flex gap-2 mt-4 flex-wrap">
                  <span
                    className="px-3 py-1 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    Tag Primária
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: config.secondaryColor }}
                  >
                    Tag Secundária
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: config.accentColor }}
                  >
                    Tag Destaque
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

