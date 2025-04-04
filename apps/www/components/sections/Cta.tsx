import Button from '../Button';

const Cta = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Get Smarter Analytics Without the Overhead
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            No complex setup. No overwhelming dashboards. Just clear insights that help you grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/signup" variant="secondary">
              Start for Free
            </Button>
            <Button href="/demo" variant="outline" className="text-white border-white hover:bg-white/10">
              View Live Demo
            </Button>
          </div>
          <p className="mt-8 text-sm text-blue-100">
            Join hundreds of website owners who switched to simpler, smarter web analytics
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cta;
