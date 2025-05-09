const ComparisonTable = () => {
  const features = [
    {
      name: 'Ease of Use',
      featherstats: { value: true, description: 'Simple, clean UI' },
      ga: { value: false, description: 'Overwhelming complexity' },
    },
    {
      name: 'Actionable Insights',
      featherstats: { value: true, description: 'Clarity Mode explains key metrics' },
      ga: { value: false, description: 'Pure data, no explanations' },
    },
    {
      name: 'Privacy-Friendly',
      featherstats: { value: true, description: 'No cookies, EU hosting' },
      ga: { value: false, description: 'Tracks users across sites' },
    },
    {
      name: 'Setup',
      featherstats: { value: true, description: '1-minute script install' },
      ga: { value: false, description: 'Complicated configuration' },
    },
    {
      name: 'Core Analytics',
      featherstats: { value: true, description: 'Covers all essential metrics' },
      ga: { value: true, description: 'More detailed but often unnecessary' },
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl text-foreground font-bold mb-4">Simple vs Complex</h2>
          <p className="text-xl text-foreground-muted">
            See how Featherstats compares to Google Analytics for essential website tracking.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden bg-black/20 shadow-lg rounded-xl">
            <table className="min-w-full">
              <thead>
                <tr className="bg-black/20">
                  <th className="py-4 px-6 text-left text-sm font-semibold text-foreground">Feature</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-primary">Featherstats</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-foreground-muted">Google Analytics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                {features.map((feature, index) => (
                  <tr key={index}>
                    <td className="py-4 px-6 text-sm font-medium text-foreground">{feature.name}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-start">
                        <span className={`mr-2 ${feature.featherstats.value ? 'text-green-500' : 'text-red-500'}`}>
                          {feature.featherstats.value ? '✓' : '✕'}
                        </span>
                        <span className="text-sm text-foreground-muted">{feature.featherstats.description}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-start">
                        <span className={`mr-2 ${feature.ga.value ? 'text-green-500' : 'text-red-500'}`}>
                          {feature.ga.value ? '✓' : '✕'}
                        </span>
                        <span className="text-sm text-foreground-muted">{feature.ga.description}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
