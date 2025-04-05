import PageLayout from '@/components/layouts/PageLayout';


export default function ToS() {
  return (
    <PageLayout
      title="Terms of Service"
      subtitle="Effective Date: 5th of April 2025"
    >
      <div>
        <p>
          Welcome to <strong>Featherstats</strong>, a lightweight analytics platform designed to help website owners understand their traffic without the complexity of traditional analytics tools. By accessing or using Featherstats ("Service", "we", "our", or "us"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
        </p>

        <hr />

        <h2>1. Use of the Service</h2>
        <p>
          You may use Featherstats only in compliance with these Terms and all applicable laws and regulations. You are responsible for your conduct and any data, content, or resources you track using our Service.
        </p>
        <p>You agree <strong>not to use Featherstats</strong> to:</p>
        <ul>
          <li>Track or monitor illegal, illicit, or adult content websites.</li>
          <li>Engage in any unlawful, harmful, or abusive activities.</li>
          <li>Circumvent usage restrictions or attempt to exploit the system.</li>
        </ul>
        <p>We reserve the right to immediately suspend or terminate your account if you violate these rules.</p>

        <h2>2. Subscription Plans and Billing</h2>
        <p>
          Featherstats is offered as a subscription-based service with multiple tiers, including a free tier and paid plans such as Growth and Scale (plan names may change over time).
        </p>
        <ul>
          <li><strong>Billing Frequency:</strong> Users can select monthly or annual billing at checkout.</li>
          <li><strong>Trials:</strong> We may offer free trial periods. If a trial is available, it will be clearly indicated during sign-up.</li>
          <li><strong>Payments:</strong> Payments are processed securely through <strong>Stripe</strong>. By subscribing, you authorize us to charge your payment method in accordance with your selected plan.</li>
        </ul>

        <h2>3. Usage Limits</h2>
        <p>
          Each plan includes a monthly event tracking allowance. To protect system stability, we enforce a <strong>daily soft limit</strong> calculated as:
        </p>
        <blockquote>
          <p>(monthly limit ÷ 30) × 1.25</p>
        </blockquote>
        <p>
          This allows short-term traffic spikes to be absorbed, while preventing abuse or sudden consumption of your full monthly quota. Exceeding this limit may result in delayed or paused data collection for the day.
        </p>

        <h2>4. Data Accuracy and Availability</h2>
        <p>
          We strive to ensure data accuracy and uptime, but <strong>Featherstats makes no guarantees regarding data completeness, correctness, or availability</strong>. The Service is provided "as is".
        </p>
        <p>
          We are <strong>not liable for any loss of business, revenue, or data</strong> resulting from inaccuracies, service downtime, or loss of analytics data, even if we were advised of the possibility of such damages.
        </p>

        <h2>5. Account Termination</h2>
        <p>We reserve the right to suspend or terminate your account <strong>without notice or refund</strong> if:</p>
        <ul>
          <li>You violate these Terms;</li>
          <li>You engage in abuse of the system (e.g., excessive traffic, prohibited content, or circumventing limits).</li>
        </ul>
        <p>
          You may cancel your subscription at any time via your account dashboard. Cancellations take effect at the end of the current billing cycle and <strong>we do not offer refunds for unused time</strong>.
        </p>

        <h2>6. Privacy</h2>
        <p>
          By using Featherstats, you agree to the collection and processing of data as outlined in our <a href="#">Privacy Policy</a>. A completed version of our Privacy Policy will be made available soon.
        </p>
        <p>Featherstats uses <strong>Tinybird</strong> for data storage and processing.</p>

        <h2>7. Modifications to These Terms</h2>
        <p>
          We may revise these Terms at any time without prior notice. Continued use of the Service after changes are posted constitutes your acceptance of the updated Terms.
        </p>

        <h2>8. Third-Party Services</h2>
        <p>
          We rely on third-party services like <strong>Stripe</strong> (for payments) and <strong>Tinybird</strong> (for data infrastructure). Your use of Featherstats is also subject to the terms of those providers.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of the <strong>Netherlands</strong>, without regard to conflict of law principles. Any disputes shall be resolved in the courts of the Netherlands.
        </p>

        <h2>10. Contact</h2>
        <p>
          For questions about these Terms, please contact:
          📧 <a href="mailto:hello@featherstats.com">hello@featherstats.com</a>
        </p>
      </div>

    </PageLayout>
  );
}
