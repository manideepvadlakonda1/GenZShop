import './StaticPages.css'

const PrivacyPolicy = () => {
  return (
    <div className="static-page">
      <div className="container">
        <div className="page-header">
          <h1>Privacy Policy</h1>
          <p className="page-subtitle">Last Updated: December 3, 2025</p>
        </div>

        <div className="page-content">
          <section className="content-section">
            <h2>1. Introduction</h2>
            <p>
              At GenZshop, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
              website or make a purchase from us.
            </p>
          </section>

          <section className="content-section">
            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>When you register or make a purchase, we may collect:</p>
            <ul>
              <li>Name and contact information (email, phone number)</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed securely through payment gateways)</li>
              <li>Order history and preferences</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <ul>
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Cookies and usage data</li>
              <li>Pages visited and time spent on site</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and updates</li>
              <li>Improve our website and services</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Prevent fraud and enhance security</li>
              <li>Respond to customer service requests</li>
              <li>Analyze usage patterns and trends</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>4. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share information with:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> Payment processors, shipping companies, and email service providers</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information, including:
            </p>
            <ul>
              <li>SSL encryption for data transmission</li>
              <li>Secure payment processing through trusted gateways</li>
              <li>Regular security audits and updates</li>
              <li>Restricted access to personal information</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>6. Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
              You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section className="content-section">
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and update your personal information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with regulatory authorities</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>8. Children's Privacy</h2>
            <p>
              Our website is not intended for children under 13. We do not knowingly collect personal information 
              from children without parental consent.
            </p>
          </section>

          <section className="content-section">
            <h2>9. Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated 
              revision date. We encourage you to review this policy regularly.
            </p>
          </section>

          <section className="content-section">
            <h2>10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or how we handle your data, please contact us at:
            </p>
            <ul>
              <li><strong>Email:</strong> privacy@genzshop.com</li>
              <li><strong>Phone:</strong> +91 9876543210</li>
              <li><strong>Address:</strong> GenZshop, 123 Fashion Street, Mumbai, India - 400001</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
