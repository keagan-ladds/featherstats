import PageLayout from '@/components/layouts/PageLayout';


export default function PrivacyPolicyPage() {
    return (
        <PageLayout
            title="Privacy Policy"
            subtitle="Effective Date: 5th of April 2025"
        >
            <div>
                <p>
                    Welcome to Featherstats. Your privacy matters to us.
                </p>
                <p>
                    This Privacy Policy explains what information we collect, why we collect it, how we use it, and your rights regarding your data when you use Featherstats ("we", "our", or "us").
                </p>

                <hr />

                <h2>1. Who We Are</h2>
                <p>
                    Featherstats is a lightweight, privacy-friendly web analytics platform operated from the Netherlands (EU). Our goal is to help website owners understand their traffic without compromising privacy.
                </p>
                <p>
                    If you have any questions, you can contact us at:<br />
                    📧 <a href="mailto:hello@featherstats.com">hello@featherstats.com</a>
                </p>

                <h2>2. Information We Collect</h2>

                <h3>From Featherstats Users (Account Holders)</h3>
                <p>When you sign up or use our platform, we collect:</p>
                <ul>
                    <li>Your email address</li>
                    <li>Subscription preferences (monthly or annual)</li>
                    <li>Technical logs (for error/debugging purposes)</li>
                </ul>
                <p><strong>Note:</strong> We do <em>not</em> store your payment information. All billing is handled securely by <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">Stripe</a>.</p>

                <h3>From Website Visitors (Tracked by Featherstats)</h3>
                <p>When you use Featherstats on your site, we collect anonymized usage data from your visitors, including:</p>
                <ul>
                    <li>Anonymized IP address</li>
                    <li>User agent (used to infer browser, OS, and device type)</li>
                    <li>Referrer</li>
                    <li>Country and region</li>
                    <li>Language</li>
                    <li>Session activity (via local/session storage)</li>
                    <li>Custom event data (optional, controlled by you)</li>
                </ul>
                <p>We <strong>do not</strong> use cookies, fingerprinting, or any cross-device tracking methods.</p>

                <h2>3. How We Store and Use Data</h2>
                <p>We use your data to:</p>
                <ul>
                    <li>Provide and improve our service</li>
                    <li>Prevent abuse</li>
                    <li>Send service-related emails (via Resend)</li>
                    <li>Handle subscriptions and payments (via Stripe)</li>
                </ul>
                <p>Analytics data is processed using <strong>Tinybird</strong> and stored indefinitely to support long-term trend analysis.</p>
                <p>Your data may also pass through <strong>Vercel</strong> (our hosting provider).</p>

                <h2>4. Legal Bases for Processing (Under GDPR)</h2>
                <p>We process your data based on:</p>
                <ul>
                    <li><strong>Contractual necessity</strong> – to provide the service you signed up for</li>
                    <li><strong>Legitimate interest</strong> – to run, secure, and improve the platform</li>
                    <li><strong>Consent</strong> – for optional features or when required by law</li>
                </ul>

                <h2>5. Data Sharing</h2>
                <p>We do not sell or rent your personal data. We share data only with trusted third-party providers that help us operate Featherstats:</p>
                <ul>
                    <li><strong>Stripe</strong> – payment processing</li>
                    <li><strong>Tinybird</strong> – data storage and analytics engine</li>
                    <li><strong>Vercel</strong> – hosting provider</li>
                    <li><strong>Resend</strong> – transactional email service</li>
                </ul>
                <p>All providers are GDPR-compliant and only receive the data they need to perform their role.</p>

                <h2>6. Data Retention</h2>
                <ul>
                    <li><strong>Analytics data</strong> is stored indefinitely unless you request deletion.</li>
                    <li><strong>Account data</strong> is stored as long as you have an active account.</li>
                </ul>
                <p>
                    We may retain some data for legal or operational reasons (e.g., billing records).
                    You may request deletion of your data at any time by emailing <a href="mailto:hello@featherstats.com">hello@featherstats.com</a>.
                    We will comply unless we are legally required to retain it or if it’s necessary to keep your account active.
                </p>

                <h2>7. Your Rights</h2>
                <p>
                    Under applicable data protection laws (like the GDPR), you may have rights such as:
                </p>
                <ul>
                    <li>Access to your personal data</li>
                    <li>Correction of inaccurate data</li>
                    <li>Deletion of your data (where possible)</li>
                </ul>
                <p>
                    To exercise these rights, contact us at <a href="mailto:hello@featherstats.com">hello@featherstats.com</a>.
                    Please note that some requests may limit your ability to continue using the service.
                </p>

                <h2>8. Children’s Privacy</h2>
                <p>
                    Featherstats is not intended for use by children under the age of 16. We do not knowingly collect personal data from children.
                </p>

                <h2>9. Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We’ll post any changes on this page, and your continued use of the service means you accept the updated version.
                </p>

                <h2>10. Contact Us</h2>
                <p>
                    If you have any questions or concerns about this Privacy Policy or your data, please reach out:<br />
                    📧 <a href="mailto:hello@featherstats.com">hello@featherstats.com</a>
                </p>
            </div>

        </PageLayout>
    );
}
