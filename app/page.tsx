'use client';

import { useState } from 'react';

const models = [
  {
    id: 'dalle3',
    name: 'DALL-E 3',
    description: 'OpenAI\'s latest image generation model',
    icon: '🎨',
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'High-quality artistic image generation',
    icon: '🖼️',
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion XL',
    description: 'Open-source diffusion model',
    icon: '⚡',
  },
  {
    id: 'imagen',
    name: 'Imagen 3',
    description: 'Google\'s photorealistic image model',
    icon: '📸',
  },
  {
    id: 'flux',
    name: 'Flux Pro',
    description: 'State-of-the-art image synthesis',
    icon: '✨',
  },
  {
    id: 'banana',
    name: 'Banana',
    description: 'Fast inference optimized model',
    icon: '🍌',
  },
];

export default function Home() {
  const [selectedModel, setSelectedModel] = useState(models[0].id);
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedImage('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          prompt,
          negativePrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedImage(data.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            AI Image Generator
          </h1>
          <p className="text-xl text-gray-300">
            Generate stunning images with famous AI models
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Model Selection */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-white">Select Model</h2>
              <div className="grid grid-cols-2 gap-3">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedModel === model.id
                        ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                        : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-3xl mb-2">{model.icon}</div>
                    <div className="font-semibold text-white">{model.name}</div>
                    <div className="text-sm text-gray-400 mt-1">{model.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-white">Prompt</h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="w-full h-32 bg-gray-700/50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Negative Prompt (Optional)
                </label>
                <input
                  type="text"
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="What to avoid in the image..."
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`mt-6 w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  isGenerating
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02]'
                } text-white`}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Generating...
                  </div>
                ) : (
                  'Generate Image'
                )}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-200">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Generated Image */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">Generated Image</h2>
            <div className="aspect-square bg-gray-700/30 rounded-xl overflow-hidden border-2 border-gray-600 flex items-center justify-center">
              {generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center text-gray-400 p-8">
                  {isGenerating ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mb-4"></div>
                      <p className="text-lg">Creating your masterpiece...</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-6xl mb-4">🎨</div>
                      <p className="text-lg">Your generated image will appear here</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {generatedImage && (
              <a
                href={generatedImage}
                download="generated-image.png"
                className="mt-4 block w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl font-semibold text-center transition-all duration-200"
              >
                Download Image
              </a>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Fast Generation</h3>
            <p className="text-gray-400">
              Get your images in seconds with optimized inference
            </p>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Multiple Models</h3>
            <p className="text-gray-400">
              Choose from DALL-E, Stable Diffusion, Imagen, and more
            </p>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-xl font-semibold mb-2 text-white">High Quality</h3>
            <p className="text-gray-400">
              Generate photorealistic and artistic images
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
