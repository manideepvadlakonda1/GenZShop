import './StaticPages.css'

const AboutUs = () => {
  return (
    <div className="static-page">
      <div className="container">
        <div className="page-header">
          <h1>About GenZshop</h1>
          <p className="page-subtitle">Your Trusted Fashion Partner Since 2020</p>
        </div>

        <div className="page-content">
          <section className="content-section">
            <h2>Who We Are</h2>
            <p>
              GenZshop is a premier online fashion destination that brings you the latest trends in ethnic and contemporary wear. 
              Founded in 2020, we've grown from a small startup to one of the most trusted names in online fashion retail.
            </p>
            <p>
              Our mission is simple: to make quality fashion accessible to everyone. We believe that great style shouldn't 
              come with a hefty price tag, which is why we work directly with manufacturers to bring you authentic products 
              at competitive prices.
            </p>
          </section>

          <section className="content-section">
            <h2>What We Offer</h2>
            <ul className="feature-list">
              <li><i className="fas fa-check-circle"></i> Wide range of ethnic wear including sarees, kurtas, and traditional outfits</li>
              <li><i className="fas fa-check-circle"></i> Contemporary fashion for men and women</li>
              <li><i className="fas fa-check-circle"></i> Quality checked products from trusted manufacturers</li>
              <li><i className="fas fa-check-circle"></i> Competitive pricing with regular discounts and offers</li>
              <li><i className="fas fa-check-circle"></i> Fast and reliable shipping across India</li>
              <li><i className="fas fa-check-circle"></i> Easy returns and hassle-free refunds</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <i className="fas fa-shield-alt"></i>
                <h3>Quality Assurance</h3>
                <p>Every product is thoroughly checked before shipping to ensure the highest quality standards.</p>
              </div>
              <div className="value-card">
                <i className="fas fa-users"></i>
                <h3>Customer First</h3>
                <p>Your satisfaction is our priority. We're here to help with any questions or concerns.</p>
              </div>
              <div className="value-card">
                <i className="fas fa-leaf"></i>
                <h3>Sustainable Fashion</h3>
                <p>We're committed to eco-friendly practices and sustainable fashion choices.</p>
              </div>
              <div className="value-card">
                <i className="fas fa-rocket"></i>
                <h3>Innovation</h3>
                <p>Constantly evolving to bring you the latest trends and best shopping experience.</p>
              </div>
            </div>
          </section>

          <section className="content-section">
            <h2>Why Choose Us?</h2>
            <p>
              With thousands of satisfied customers across India, GenZshop has established itself as a reliable and 
              customer-centric online shopping platform. Our dedicated team works round the clock to ensure that your 
              shopping experience is smooth, enjoyable, and memorable.
            </p>
            <p>
              We understand that online shopping can sometimes be uncertain, which is why we offer detailed product 
              descriptions, multiple images, size guides, and a responsive customer support team to assist you with 
              any queries.
            </p>
          </section>

          <section className="content-section cta-section">
            <h2>Join Our Fashion Journey</h2>
            <p>
              Whether you're looking for traditional ethnic wear for a special occasion or contemporary fashion for 
              everyday style, GenZshop has got you covered. Explore our collection and discover your perfect style today!
            </p>
            <a href="/shop" className="cta-button">Start Shopping</a>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
