import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { model, prompt, negativePrompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Simulate image generation with demo images
    // In production, this would call actual AI APIs
    const demoImages: Record<string, string[]> = {
      'dalle3': [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1024&h=1024&fit=crop',
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1024&h=1024&fit=crop',
      ],
      'midjourney': [
        'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=1024&h=1024&fit=crop',
        'https://images.unsplash.com/photo-1706885093476-b1e54f2e8f41?w=1024&h=1024&fit=crop',
      ],
      'stable-diffusion': [
        'https://images.unsplash.com/photo-1686904423955-b1f11ce5a8f7?w=1024&h=1024&fit=crop',
        'https://images.unsplash.com/photo-1707343848552-893e05dba6ac?w=1024&h=1024&fit=crop',
      ],
      'imagen': [
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1024&h=1024&fit=crop',
        'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1024&h=1024&fit=crop',
      ],
      'flux': [
        'https://images.unsplash.com/photo-1709884735626-63e92727d8b6?w=1024&h=1024&fit=crop',
        'https://images.unsplash.com/photo-1706885093562-7b3797f204bd?w=1024&h=1024&fit=crop',
      ],
      'banana': [
        'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=1024&h=1024&fit=crop',
        'https://images.unsplash.com/photo-1696446702365-e6c4b0e57745?w=1024&h=1024&fit=crop',
      ],
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get random image from the selected model's demo images
    const images = demoImages[model as keyof typeof demoImages] || demoImages['dalle3'];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    return NextResponse.json({
      imageUrl: randomImage,
      model,
      prompt,
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
