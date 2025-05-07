import React from 'react';

function TermsOfService() {
  return (
    <div className="terms-container">
      <header className="terms-header">
        <h1 className="terms-title">Terms of Service</h1>
        <p className="terms-subtitle">Last updated: [Insert Date]</p>
      </header>

      <section className="terms-intro">
        <p className="terms-text">
          Welcome to <b style={{color:'rgb(241, 130, 90)'}}>WeCare EHS Consultancy</b>. These Terms of Service outline the rules and regulations for the use of our website and services. By accessing or using our services, you agree to comply with and be bound by these Terms.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="section-title">1. Acceptance of Terms</h2>
        <p className="terms-text">
          By using our services, you affirm that you are at least 18 years of age and have the legal capacity to enter into these Terms. If you do not agree with any part of these Terms, you must not use our services.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="section-title">2. Changes to Terms</h2>
        <p className="terms-text">
          We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any changes indicates your acceptance of the new Terms.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="section-title">3. User Responsibilities</h2>
        <p className="terms-text">
          You agree to use our services only for lawful purposes and in a manner that does not infringe on the rights of, restrict, or inhibit anyone else’s use and enjoyment of our services.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="section-title">4. Intellectual Property</h2>
        <p className="terms-text">
          All content provided on our website, including text, graphics, logos, and images, is the property of <b style={{color:'rgb(241, 130, 90)'}}>WeCare EHS Consultancy</b> and is protected by applicable copyright and intellectual property laws.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="section-title">5. Limitation of Liability</h2>
        <p className="terms-text">
          In no event shall <b style={{color:'rgb(241, 130, 90)'}}>WeCare EHS Consultancy</b>, its directors, employees, or agents be liable for any indirect, incidental, or consequential damages arising from your use of our services.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="section-title">6. Governing Law</h2>
        <p className="terms-text">
          These Terms shall be governed by and construed in accordance with the laws of India and under Thane (Maharashtra) Jurisdiction, without regard to its conflict of law principles.
        </p>
      </section>

      <footer className="terms-footer">
        <p className="footer-text">
          If you have any questions about these Terms, please contact us at wecareehs@gmail.com
        </p>
      </footer>

      <style jsx>{`
        .terms-container {
          max-width: 800px;
          margin: auto;
          padding: 40px;
          background: #1a1a1a;
          color: #ffffff;
          border-radius: 10px;
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          display: flex;
          flex-direction: column;
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .terms-title {
          text-align: center;
          color:rgb(241, 130, 90);
          margin-bottom: 10px;
        }
        .we-care{
        color:rgb(241, 130, 90);}

        .terms-subtitle {
          text-align: center;
          color: #cccccc;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 24px;
          margin-top: 30px;
          color: rgb(241, 130, 90);
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .section-title:hover {
          transform: translateY(-3px);
          color:rgb(241, 130, 90);
        }

        .terms-text {
          color: #cccccc;
          font-size: 18px;
          margin-bottom: 16px;
        }

        .terms-footer {
          text-align: center;
          margin-top: 40px;
          padding: 20px;
          background-color: #2c2c2c;
          border-radius: 8px;
        }

        .footer-text {
          font-size: 16px;
          color: #cccccc;
        }
      `}</style>
    </div>
  );
}

export default TermsOfService;
