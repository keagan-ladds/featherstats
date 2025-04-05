import PageLayout from '@/components/layouts/PageLayout';


export default function GdprPage() {
    return (
        <PageLayout
            title="GDPR Compliance">
            <div>
                <p>
                    Featherstats is committed to protecting the privacy of our users and their website visitors.
                    As a company based in the European Union (Netherlands), we fully respect and comply with the
                    <strong>General Data Protection Regulation (GDPR)</strong>.
                </p>

                <h2>What is GDPR?</h2>
                <p>
                    The General Data Protection Regulation (GDPR) is a data protection law that governs how companies collect,
                    use, and store personal data of individuals located in the European Economic Area (EEA). It gives users
                    significant rights over their data and imposes responsibilities on businesses that handle personal data.
                </p>

                <h2>How Featherstats Complies with GDPR</h2>
                <ul>
                    <li><strong>No Cookies or Fingerprinting:</strong> We do not use cookies or browser fingerprinting to track users across sessions or devices.</li>
                    <li><strong>Anonymized IP Addresses:</strong> We do not store full IP addresses. They are anonymized to protect end user privacy.</li>
                    <li><strong>Local Data Storage Only:</strong> We use local/session storage to track single-session activity without setting cookies.</li>
                    <li><strong>EU Hosting & Infrastructure:</strong> Featherstats is hosted in the EU. We store and process analytics data through <strong>Tinybird</strong> (EU-based) and deploy on <strong>Vercel</strong>.</li>
                    <li><strong>Minimal Data Collection:</strong> We collect only the data necessary to deliver our analytics service and manage your account.</li>
                    <li><strong>End-User Data Control:</strong> You can delete your analytics data or request removal at any time.</li>
                </ul>

                <h2>Your Rights Under GDPR</h2>
                <p>If you are located in the EEA, you have the following rights under the GDPR:</p>
                <ul>
                    <li>The right to access personal data we hold about you</li>
                    <li>The right to request correction of inaccurate data</li>
                    <li>The right to request deletion of your data (where applicable)</li>
                    <li>The right to object to or restrict certain types of data processing</li>
                    <li>The right to lodge a complaint with a data protection authority</li>
                </ul>
                <p>
                    If you wish to exercise any of these rights, please contact us using the details below.
                </p>

                <h2>Data Subprocessors</h2>
                <p>We work with a small number of trusted providers to deliver our services:</p>
                <ul>
                    <li><strong>Stripe</strong> – for payment processing (PCI-compliant)</li>
                    <li><strong>Tinybird</strong> – for data processing and real-time analytics (EU)</li>
                    <li><strong>Vercel</strong> – for hosting and deployment</li>
                    <li><strong>Resend</strong> – for sending transactional emails</li>
                </ul>
                <p>
                    All providers are GDPR-compliant and only process data necessary to perform their functions.
                </p>

                <h2>Contact Us</h2>
                <p>
                    If you have any questions about our GDPR compliance or wish to make a data-related request,
                    please contact us:
                </p>
                <p>
                    📧 <a href="mailto:hello@featherstats.com">hello@featherstats.com</a>
                </p>

                <h2>More Information</h2>
                <p>
                    You can also review our related policies:
                </p>
                <ul>
                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                    <li><a href="/terms-of-service">Terms of Service</a></li>
                </ul>

                <p>
                    Thank you for trusting Featherstats.
                </p>
            </div>
        </PageLayout>
    );
}
