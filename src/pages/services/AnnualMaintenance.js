import React from 'react';

const AnnualMaintenance = () => {
  return (
    <div style={styles.amcContainer}>
      <h1 style={styles.amcTitle}>Annual Maintenance Contract (AMC)</h1>
      <p style={styles.amcIntro}>
        Annual Maintenance Contract (AMC) helps timely service for maintaining the equipment to reduce the breakdown time at shop floor. We offer two types of AMCs : Non-comprehensive AMC and Comprehensive AMC. Both are having their own advantages. Non-comprehensive AMC is a basic and periodic maintenance service but the spare part charges will not be our scope. Whereas Comprehensive AMC covers periodic maintenance and cost of standard spareparts. Though Comprehensive AMC cost you more, but we will be in a better position to maintain standard spares stock readily available to reduce machine breakdown time. Standard spares may include the spares which are having highest wear and tear rate and other consumbables. The cost of AMC differs from machine to machine, type and quantity in the plant, their usages and number of years used. We can provide you detailed quote only after knowing all the details. Kindly go to Contact Us session and drop a message or email us all the details. We assure you best services all the time.
      </p>

      <div style={styles.amcSection}>
        <h2 style={styles.amcSubtitle}>Non-Comprehensive AMC</h2>
        <p style={styles.amcText}>
          This option provides basic and periodic maintenance services. However, please note that the cost of spare parts will not be included.
        </p>
      </div>

      <div style={styles.amcSection}>
        <h2 style={styles.amcSubtitle}>Comprehensive AMC</h2>
        <p style={styles.amcText}>
          The Comprehensive AMC includes periodic maintenance and the cost of standard spare parts. Though this may come at a higher cost, it ensures we maintain a stock of essential spares, minimizing machine breakdown time.
        </p>
      </div>

      <div style={styles.amcHighlight}>
        <p>
          Standard spares may include components with high wear and tear rates and other consumables. The AMC cost varies based on machine type, usage, age, and quantity in the plant. For a detailed quote, please <a href="/contact" style={styles.contactLink}>Contact Us</a> with your requirements.
        </p>
      </div>

      <div style={styles.amcImages}>
        <div style={styles.imagePlaceholder}>Image 1</div>
        <div style={styles.imagePlaceholder}>Image 2</div>
        <div style={styles.imagePlaceholder}>Image 3</div>
      </div>
    </div>
  );
};

const styles = {
  amcContainer: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    color: '#fff',
    backgroundColor: '#1a1a1a',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
  amcTitle: {
    color: '#ff4c4c',
    textAlign: 'center',
    fontSize: '2em',
    fontWeight: 'bold',
    marginBottom: '20px',
    textTransform: 'uppercase',
  },
  amcIntro: {
    fontSize: '1.1em',
    lineHeight: '1.6',
    marginBottom: '20px',
    color: '#f5f5f5',
    textAlign: 'justify',
  },
  amcSection: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#333',
    borderLeft: '5px solid #ff4c4c',
    borderRadius: '5px',
    
  },
  amcSubtitle: {
    fontSize: '1.5em',
    color: '#ff4c4c',
    marginBottom: '10px',
    textTransform: 'uppercase',
  },
  amcText: {
    fontSize: '1em',
    lineHeight: '1.6',
    color: '#e0e0e0',
    
  },
  amcHighlight: {
    backgroundColor: '#292929',
    padding: '15px',
    marginTop: '20px',
    textAlign: 'center',
    borderRadius: '5px',
    fontSize: '1em',
    color: '#f5f5f5',
  },
  contactLink: {
    color: '#ff4c4c',
    textDecoration: 'underline',
    transition: 'color 0.3s',
  },
  amcImages: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '30px',
  },
  imagePlaceholder: {
    width: '150px',
    height: '150px',
    backgroundColor: '#ff4c4c',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '5px',
    transition: 'transform 0.3s',
  },
};

export default AnnualMaintenance;
