import Image from 'next/image';
import Button from '../Button';

const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Web Analytics Made{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Simple & Insightful
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Featherstats helps you understand your website's traffic with clear, actionable insights—without
              the complexity of Google Analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/signup" variant="primary">
                Get Started Free
              </Button>
              <Button href="/features" variant="outline">
                See How It Works
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/dashboard-preview.png"
                alt="Featherstats Dashboard with Clarity Mode"
                fill
                className="object-cover"
                priority
              />
              {/* Tooltip Example */}
              <div className="absolute top-1/4 right-1/4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <p className="text-sm font-medium text-gray-900">✨ Clarity Mode</p>
                <p className="text-sm text-gray-600">
                  "67% of your visitors come from South Africa - consider localizing your content!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
