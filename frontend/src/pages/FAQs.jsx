import './StaticPages.css'

const FAQs = () => {
  return (
    <div className="static-page">
      <div className="container">
        <div className="page-header">
          <h1>Frequently Asked Questions</h1>
          <p className="page-subtitle">Find answers to common questions</p>
        </div>

        <div className="page-content">
          <section className="content-section">
            <h2>Orders & Payments</h2>
            
            <h3>How do I place an order?</h3>
            <p>
              Browse our collection, select the product you like, choose size/color, add to cart, and proceed to checkout. 
              Fill in your shipping details and choose payment method to complete your order.
            </p>

            <h3>What payment methods do you accept?</h3>
            <p>We accept:</p>
            <ul>
              <li>Credit/Debit Cards (Visa, Mastercard, RuPay, Amex)</li>
              <li>Net Banking</li>
              <li>UPI (Google Pay, PhonePe, Paytm, etc.)</li>
              <li>Digital Wallets (Paytm, Mobikwik, etc.)</li>
              <li>Cash on Delivery (COD)</li>
            </ul>

            <h3>Is Cash on Delivery available?</h3>
            <p>
              Yes, COD is available for most locations. An additional ₹99 COD charge applies. COD may not be available 
              for high-value orders or certain remote locations.
            </p>

            <h3>Can I modify my order after placing it?</h3>
            <p>
              Orders can only be modified before they are dispatched. Contact customer support immediately if you need 
              to make changes. Once dispatched, modifications are not possible.
            </p>

            <h3>I haven't received my order confirmation</h3>
            <p>
              Check your spam/junk folder. If you still don't see it, log in to your account and check "My Orders" section. 
              Contact support if the order doesn't appear.
            </p>
          </section>

          <section className="content-section">
            <h2>Shipping & Delivery</h2>

            <h3>How long does delivery take?</h3>
            <p>
              Metro cities: 3-5 business days<br />
              Other cities: 5-7 business days<br />
              Remote areas: 7-10 business days
            </p>

            <h3>Do you ship internationally?</h3>
            <p>
              Currently, we only ship within India. International shipping will be available soon.
            </p>

            <h3>How can I track my order?</h3>
            <p>
              Once shipped, you'll receive a tracking number via email/SMS. Track your order in "My Orders" section 
              or on the courier partner's website.
            </p>

            <h3>What if I'm not available during delivery?</h3>
            <p>
              The courier will attempt delivery up to 3 times. If unsuccessful, the order will be returned to us. 
              Make sure to provide accurate contact information.
            </p>

            <h3>Can I change my delivery address?</h3>
            <p>
              Address can be changed only before dispatch. Contact support immediately. Once shipped, address 
              cannot be modified.
            </p>
          </section>

          <section className="content-section">
            <h2>Returns & Refunds</h2>

            <h3>What is your return policy?</h3>
            <p>
              We offer a 7-day return policy from delivery date. Products must be unused, unworn, unwashed, with 
              original tags and packaging.
            </p>

            <h3>How do I return a product?</h3>
            <p>
              Log in → My Orders → Select order → Click "Return" → Choose reason → Schedule pickup. Our team will 
              collect the product from your address.
            </p>

            <h3>When will I get my refund?</h3>
            <p>
              Refunds are processed within 5-7 business days after we receive and inspect the returned product. 
              COD refunds may take 7-10 days.
            </p>

            <h3>Are return charges applicable?</h3>
            <p>
              Free return for defective/wrong products. ₹99 pickup charge for other returns (deducted from refund).
            </p>

            <h3>Can I exchange a product?</h3>
            <p>
              Yes, exchanges available for size/color (subject to stock). Initiate return and place a new order, 
              or contact support for assistance.
            </p>
          </section>

          <section className="content-section">
            <h2>Products & Sizing</h2>

            <h3>How do I choose the right size?</h3>
            <p>
              Refer to our detailed size chart available on each product page. If unsure, contact customer support 
              for personalized sizing advice.
            </p>

            <h3>Are product colors accurate?</h3>
            <p>
              We strive for accuracy, but colors may vary slightly due to screen settings and lighting. Product 
              images are for reference.
            </p>

            <h3>Are products authentic?</h3>
            <p>
              Yes, all products are 100% authentic. We work directly with manufacturers and authorized distributors 
              to ensure quality and authenticity.
            </p>

            <h3>Do you have a size guide?</h3>
            <p>
              Yes, size guides are available on product pages. Click "Size Guide" link near the size selector for 
              detailed measurements.
            </p>

            <h3>Can I see more images of a product?</h3>
            <p>
              Most products have multiple images. Click on thumbnails to view different angles. Zoom feature available 
              for detailed viewing.
            </p>
          </section>

          <section className="content-section">
            <h2>Account & Wishlist</h2>

            <h3>Do I need an account to shop?</h3>
            <p>
              You can browse without an account, but registration is required to place orders. Creating an account 
              helps you track orders, save addresses, and manage wishlist.
            </p>

            <h3>How do I reset my password?</h3>
            <p>
              Click "Forgot Password" on login page → Enter registered email → Check email for reset link → 
              Create new password.
            </p>

            <h3>Can I change my email/phone number?</h3>
            <p>
              Yes, log in to your account → Go to Profile → Edit information → Save changes. Email verification 
              may be required.
            </p>

            <h3>How does the Wishlist work?</h3>
            <p>
              Click the heart icon on any product to add to wishlist. Access your wishlist anytime from the menu. 
              You'll also receive notifications about price drops on wishlisted items.
            </p>
          </section>

          <section className="content-section">
            <h2>Offers & Discounts</h2>

            <h3>How do I apply a coupon code?</h3>
            <p>
              At checkout, look for "Apply Coupon" field. Enter code and click "Apply". Discount will be reflected 
              in order total.
            </p>

            <h3>Why isn't my coupon working?</h3>
            <p>
              Check: Coupon validity date, minimum order value, applicable categories, usage limits. Some coupons 
              cannot be combined with other offers.
            </p>

            <h3>Do you have student discounts?</h3>
            <p>
              We occasionally run student-specific promotions. Subscribe to our newsletter to stay updated about 
              special offers.
            </p>

            <h3>Can I use multiple coupons on one order?</h3>
            <p>
              Generally, only one coupon can be used per order. Check coupon terms for specific conditions.
            </p>
          </section>

          <section className="content-section">
            <h2>Customer Support</h2>

            <h3>How can I contact customer support?</h3>
            <p>
              Email: support@genzshop.com<br />
              Phone: +91 9876543210<br />
              WhatsApp: +91 9876543210<br />
              Hours: 10 AM - 6 PM (Mon-Sat)<br />
              Response time: Within 24 hours
            </p>

            <h3>I received a damaged product, what should I do?</h3>
            <p>
              Take photos of damage → Contact support within 48 hours → We'll arrange immediate replacement or 
              full refund. No return charges for damaged items.
            </p>

            <h3>Wrong product delivered, how to resolve?</h3>
            <p>
              Report immediately with order number and photos. We'll arrange return pickup at no cost and ship 
              correct product right away.
            </p>
          </section>

          <section className="content-section">
            <h2>Security & Privacy</h2>

            <h3>Is my payment information secure?</h3>
            <p>
              Yes, we use industry-standard SSL encryption. Payment processing is handled by secure, PCI-DSS 
              compliant gateways. We never store your card details.
            </p>

            <h3>How is my personal data used?</h3>
            <p>
              We use your data only to process orders, communicate with you, and improve our services. We never 
              sell your information to third parties. Read our Privacy Policy for details.
            </p>

            <h3>Can I delete my account?</h3>
            <p>
              Yes, contact customer support to request account deletion. Please note this action is irreversible 
              and you'll lose all order history and wishlist data.
            </p>
          </section>

          <div className="cta-section">
            <h2>Still Have Questions?</h2>
            <p>
              Can't find what you're looking for? Our customer support team is here to help!
            </p>
            <a href="mailto:support@genzshop.com" className="cta-button">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQs
