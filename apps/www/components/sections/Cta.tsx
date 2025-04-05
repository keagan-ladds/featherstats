import { getWebAppURL } from '@/lib/utils';
import Button from '../Button';
import Image from 'next/image';

const Cta = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary to-primary-dark">
      <div className="container relative mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foregrounde mb-3">
            Get Smarter Analytics Without the Overhead
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            No complex setup. No overwhelming dashboards. Just clear insights that help you grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={getWebAppURL("signup")} variant="secondary">
              Start for Free
            </Button>
            {/* <Button href="/demo" variant="outline" className="text-white border-white hover:bg-white/50">
              View Live Demo
            </Button> */}
          </div>
          {/* <p className="mt-8 text-sm text-foreground">
            Join hundreds of website owners who switched to simpler, smarter web analytics
          </p> */}
        </div>
      </div>
      {/* <div className="absolute right-0 top-0 h-full">
        <div className="aspect-[4/3] h-full rounded-xl overflow-hidden hidden xl:block">
          <Image
            src="/images/featherstats-hero-2.png"
            alt="Featherstats Dashboard with Clarity Mode"
            fill
            className="object-cover"
            sizes='(max-width: 768px) 50vw, 33vw'
            priority
          />
        </div>
      </div> */}
    </section>
  );
};

export default Cta;
