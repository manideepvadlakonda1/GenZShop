import './StaticPages.css'

const ShippingPolicy = () => {
  return (
    <div className="static-page">
      <div className="container">
        <div className="page-header">
          <h1>Shipping & Return Policy</h1>
          <p className="page-subtitle">Everything you need to know about shipping and returns</p>
        </div>

        <div className="page-content">
          <section className="content-section">
            <h2>Shipping Policy</h2>
            
            <h3>Shipping Coverage</h3>
            <p>We currently ship to all locations across India. International shipping is not available at this time.</p>

            <h3>Processing Time</h3>
            <ul>
              <li><strong>Standard Orders:</strong> 1-2 business days</li>
              <li><strong>Custom Orders:</strong> 3-5 business days</li>
              <li><strong>Pre-orders:</strong> As specified on product page</li>
            </ul>
            <p className="note">Orders placed on weekends and holidays will be processed on the next business day.</p>

            <h3>Delivery Time</h3>
            <ul>
              <li><strong>Metro Cities:</strong> 3-5 business days</li>
              <li><strong>Other Cities:</strong> 5-7 business days</li>
              <li><strong>Remote Areas:</strong> 7-10 business days</li>
            </ul>

            <h3>Shipping Charges</h3>
            <ul>
              <li>Free shipping on orders above ₹999</li>
              <li>₹50 flat shipping charges on orders below ₹999</li>
              <li>₹99 additional charges for COD orders</li>
              <li>Express delivery available at ₹150 extra (delivery in 2-3 days)</li>
            </ul>

            <h3>Order Tracking</h3>
            <p>
              Once your order is shipped, you will receive a tracking number via email and SMS. You can track your 
              order through the courier partner's website or in your account dashboard under "My Orders".
            </p>

            <h3>Shipping Partners</h3>
            <p>We work with reliable courier partners including:</p>
            <ul>
              <li>Delhivery</li>
              <li>Blue Dart</li>
              <li>DTDC</li>
              <li>India Post</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Return & Exchange Policy</h2>

            <h3>Return Window</h3>
            <p>
              We offer a <strong>7-day return policy</strong> from the date of delivery. The product must be unused, 
              unworn, unwashed, and in its original condition with all tags attached.
            </p>

            <h3>Eligible for Return</h3>
            <ul>
              <li>Defective or damaged products</li>
              <li>Wrong product delivered</li>
              <li>Size issues (if you've followed our size guide)</li>
              <li>Color/quality not as described</li>
            </ul>

            <h3>Non-Returnable Items</h3>
            <ul>
              <li>Products without original tags or packaging</li>
              <li>Used, worn, or altered items</li>
              <li>Innerwear and lingerie (for hygiene reasons)</li>
              <li>Custom or personalized products</li>
              <li>Products on final sale or clearance</li>
              <li>Beauty and cosmetic products once opened</li>
            </ul>

            <h3>How to Initiate a Return</h3>
            <ol>
              <li>Log in to your account</li>
              <li>Go to "My Orders"</li>
              <li>Select the order and click "Return"</li>
              <li>Choose reason for return</li>
              <li>Our team will review and approve within 24 hours</li>
              <li>Schedule pickup or drop at nearest courier center</li>
            </ol>

            <h3>Return Pickup</h3>
            <ul>
              <li>Free pickup for defective or wrong products</li>
              <li>₹99 pickup charges for other returns (deducted from refund)</li>
              <li>Pickup scheduled within 2-3 business days</li>
            </ul>

            <h3>Quality Check</h3>
            <p>
              Once we receive the returned product, our team will inspect it within 2-3 business days. 
              If the product passes quality check, we'll process your refund or exchange.
            </p>

            <h3>Exchange Policy</h3>
            <ul>
              <li>Exchanges available for size and color (subject to availability)</li>
              <li>No price difference for same product exchange</li>
              <li>Different product exchange = return + new order</li>
              <li>Exchange delivery in 5-7 business days</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Refund Policy</h2>

            <h3>Refund Processing Time</h3>
            <ul>
              <li><strong>Online Payments:</strong> 5-7 business days after approval</li>
              <li><strong>COD Orders:</strong> Refund to bank account (provide details)</li>
              <li><strong>Wallet/UPI:</strong> 3-5 business days</li>
            </ul>

            <h3>Refund Amount</h3>
            <ul>
              <li>Full refund for defective or wrong products (including shipping)</li>
              <li>Product amount minus pickup charges (₹99) for other returns</li>
              <li>Shipping charges non-refundable for change of mind returns</li>
            </ul>

            <h3>Partial Refund</h3>
            <p>Partial refund may be issued if:</p>
            <ul>
              <li>Product returned without original packaging</li>
              <li>Product shows signs of use</li>
              <li>Tags or labels are missing</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Damaged or Defective Items</h2>
            <p>
              If you receive a damaged or defective product:
            </p>
            <ol>
              <li>Take clear photos of the product and packaging</li>
              <li>Report within 48 hours of delivery</li>
              <li>Contact customer support with order details and photos</li>
              <li>We'll arrange immediate replacement or full refund</li>
              <li>No return shipping charges for such cases</li>
            </ol>
          </section>

          <section className="content-section">
            <h2>Wrong Product Delivered</h2>
            <p>
              If you receive a wrong product:
            </p>
            <ul>
              <li>Report within 48 hours with photos</li>
              <li>We'll arrange return pickup at no cost</li>
              <li>Correct product shipped immediately</li>
              <li>Full refund option available</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Lost or Undelivered Orders</h2>
            <p>
              If your order is marked delivered but not received:
            </p>
            <ol>
              <li>Check with family members or neighbors</li>
              <li>Contact the courier partner using tracking number</li>
              <li>Report to us within 48 hours</li>
              <li>We'll investigate with courier partner</li>
              <li>Refund or replacement after investigation</li>
            </ol>
          </section>

          <section className="content-section">
            <h2>Contact for Shipping & Returns</h2>
            <p>Need help with shipping or returns?</p>
            <ul>
              <li><strong>Email:</strong> returns@genzshop.com</li>
              <li><strong>WhatsApp:</strong> +91 9876543210</li>
              <li><strong>Phone:</strong> +91 9876543210 (10 AM - 6 PM, Mon-Sat)</li>
              <li><strong>Response Time:</strong> Within 24 hours</li>
            </ul>
          </section>

          <div className="cta-section">
            <p className="note">
              <strong>Note:</strong> This policy is subject to change. Please check this page for the latest updates. 
              For any queries not covered here, feel free to contact our customer support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingPolicy
