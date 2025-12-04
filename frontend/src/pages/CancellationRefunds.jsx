import './StaticPages.css'

const CancellationRefunds = () => {
  return (
    <div className="static-page">
      <div className="container">
        <div className="page-header">
          <h1>Cancellation & Refunds</h1>
          <p className="page-subtitle">Order cancellation and refund policies explained</p>
        </div>

        <div className="page-content">
          <section className="content-section">
            <h2>Order Cancellation Policy</h2>
            
            <h3>When Can You Cancel?</h3>
            <p>You can cancel your order in the following situations:</p>
            <ul>
              <li><strong>Before Dispatch:</strong> Full cancellation available without any charges</li>
              <li><strong>After Dispatch:</strong> Cannot be cancelled, but you can refuse delivery or initiate return after receiving</li>
              <li><strong>Partial Cancellation:</strong> Available for multi-item orders if items haven't been dispatched</li>
            </ul>

            <h3>How to Cancel Your Order</h3>
            <ol>
              <li>Log in to your GenZshop account</li>
              <li>Go to "My Orders" section</li>
              <li>Find the order you want to cancel</li>
              <li>Click on "Cancel Order" button</li>
              <li>Select cancellation reason from dropdown</li>
              <li>Submit cancellation request</li>
              <li>You'll receive confirmation via email and SMS</li>
            </ol>

            <h3>Cancellation Timeframes</h3>
            <ul>
              <li><strong>Order Placed Status:</strong> Instant cancellation (within 2 hours of order)</li>
              <li><strong>Processing Status:</strong> Cancellation within 12 hours of order</li>
              <li><strong>Packed Status:</strong> Cannot cancel - use return option after delivery</li>
              <li><strong>Shipped/Out for Delivery:</strong> Cannot cancel - refuse delivery or return</li>
            </ul>

            <h3>Seller-Initiated Cancellation</h3>
            <p>We may cancel your order in cases of:</p>
            <ul>
              <li>Product out of stock or unavailable</li>
              <li>Pricing errors or technical glitches</li>
              <li>Invalid delivery address</li>
              <li>Payment issues or failed transactions</li>
              <li>Suspected fraudulent activity</li>
            </ul>
            <p>In such cases, you'll receive a full refund within 3-5 business days.</p>
          </section>

          <section className="content-section">
            <h2>Refund Policy</h2>

            <h3>Refund Eligibility</h3>
            <p>You are eligible for a refund if:</p>
            <ul>
              <li>Order cancelled before dispatch</li>
              <li>Product is defective or damaged</li>
              <li>Wrong product delivered</li>
              <li>Product doesn't match description</li>
              <li>Order not delivered within promised timeframe</li>
              <li>Duplicate payment made</li>
            </ul>

            <h3>Refund Methods</h3>
            <div className="refund-methods">
              <div className="method-card">
                <h4><i className="fas fa-credit-card"></i> Online Payment Methods</h4>
                <p><strong>Credit/Debit Card:</strong> Refunded to same card in 5-7 business days</p>
                <p><strong>Net Banking:</strong> Refunded to same account in 5-7 business days</p>
                <p><strong>UPI:</strong> Refunded to source account in 3-5 business days</p>
                <p><strong>Wallets:</strong> Refunded to wallet in 3-5 business days</p>
              </div>

              <div className="method-card">
                <h4><i className="fas fa-money-bill-wave"></i> Cash on Delivery (COD)</h4>
                <p>For COD orders, refund will be processed to your bank account:</p>
                <ul>
                  <li>Provide bank account details when initiating return</li>
                  <li>Verify account details carefully</li>
                  <li>Refund processed in 7-10 business days after verification</li>
                  <li>NEFT/IMPS transfer to provided account</li>
                </ul>
              </div>
            </div>

            <h3>Refund Timeline</h3>
            <table className="refund-timeline-table">
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>Timeline</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cancellation before dispatch</td>
                  <td>3-5 business days</td>
                </tr>
                <tr>
                  <td>Product return approved</td>
                  <td>5-7 business days after receiving product</td>
                </tr>
                <tr>
                  <td>Failed delivery (multiple attempts)</td>
                  <td>5-7 business days after RTO</td>
                </tr>
                <tr>
                  <td>COD order refund</td>
                  <td>7-10 business days</td>
                </tr>
                <tr>
                  <td>Duplicate payment</td>
                  <td>3-5 business days</td>
                </tr>
              </tbody>
            </table>

            <h3>Refund Amount Calculation</h3>
            <ul>
              <li><strong>Full Refund:</strong> Order cancelled before dispatch or defective product</li>
              <li><strong>Product Price Only:</strong> Customer-initiated returns (shipping non-refundable)</li>
              <li><strong>Minus Pickup Charges:</strong> ₹99 deducted for non-defective returns</li>
              <li><strong>COD Charges:</strong> Non-refundable for cancelled COD orders</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Partial Refunds</h2>
            <p>A partial refund may be issued in the following cases:</p>
            <ul>
              <li>Product returned in used or damaged condition</li>
              <li>Missing original packaging or tags</li>
              <li>Product returned after return window has expired</li>
              <li>Promotional discount items (as per offer terms)</li>
            </ul>
            <p>The refund amount will be determined after quality inspection by our team.</p>
          </section>

          <section className="content-section">
            <h2>Non-Refundable Items</h2>
            <ul>
              <li>Gift cards or vouchers</li>
              <li>Downloaded digital products</li>
              <li>Innerwear and lingerie (hygiene reasons)</li>
              <li>Final sale or clearance items</li>
              <li>Customized or personalized products</li>
              <li>Items marked as "non-returnable" on product page</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Failed Delivery & RTO (Return to Origin)</h2>
            
            <h3>When Does RTO Happen?</h3>
            <ul>
              <li>Customer refuses to accept delivery</li>
              <li>Customer unavailable after multiple delivery attempts</li>
              <li>Incorrect or incomplete address provided</li>
              <li>Customer requests cancellation after dispatch</li>
            </ul>

            <h3>RTO Refund Policy</h3>
            <ul>
              <li><strong>Product Price:</strong> Fully refunded</li>
              <li><strong>Shipping Charges:</strong> Non-refundable</li>
              <li><strong>RTO Charges:</strong> ₹150 deducted from refund</li>
              <li><strong>Timeline:</strong> 7-10 business days after product reaches warehouse</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Refund for Promotional Items</h2>
            <ul>
              <li>Items purchased during sales/offers follow standard refund policy</li>
              <li>Free gifts must be returned along with main product</li>
              <li>Combo offers: Individual items cannot be returned separately</li>
              <li>Buy 1 Get 1: Both items must be returned for full refund</li>
              <li>Discount coupons: Discount amount will be adjusted in refund</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Refund Status Tracking</h2>
            <p>Track your refund status:</p>
            <ol>
              <li>Log in to your account</li>
              <li>Go to "My Orders"</li>
              <li>Click on the cancelled/returned order</li>
              <li>View refund status and expected date</li>
              <li>Check refund method and account details</li>
            </ol>
          </section>

          <section className="content-section">
            <h2>Refund Delays</h2>
            <p>If you haven't received your refund after the expected timeline:</p>
            <ol>
              <li>Check your bank account/card statement</li>
              <li>Contact your bank (processing delays may occur)</li>
              <li>Verify refund account details provided</li>
              <li>Contact our support team with transaction ID</li>
              <li>We'll investigate and resolve within 48 hours</li>
            </ol>
          </section>

          <section className="content-section">
            <h2>Multiple Item Orders</h2>
            <ul>
              <li>Each item in multi-item orders can be cancelled/returned separately</li>
              <li>Partial cancellation available before dispatch</li>
              <li>Refund calculated based on individual item price</li>
              <li>Shipping charges prorated if applicable</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Contact for Cancellation & Refunds</h2>
            <p>Need assistance with cancellation or refund?</p>
            <ul>
              <li><strong>Email:</strong> refunds@genzshop.com</li>
              <li><strong>Phone:</strong> +91 9876543210</li>
              <li><strong>WhatsApp:</strong> +91 9876543210</li>
              <li><strong>Support Hours:</strong> 10 AM - 6 PM (Mon-Sat)</li>
              <li><strong>Response Time:</strong> Within 24 hours</li>
            </ul>
          </section>

          <div className="cta-section">
            <p className="note">
              <strong>Important:</strong> Please ensure you read and understand our cancellation and refund policies 
              before placing an order. For specific queries or exceptional cases, please contact our customer support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CancellationRefunds
