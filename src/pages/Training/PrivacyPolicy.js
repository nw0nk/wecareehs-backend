import React from "react";

const PrivacyPolicy = () => {
  const styles = {
    container: {
      background: "linear-gradient(135deg, #1a1a1a 0%, #333 100%)",
      fontFamily: "'Montserrat', sans-serif",
      color: "#fff",
      padding: "50px",
      maxWidth: "900px",
      margin: "40px auto",
      borderRadius: "15px",
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)",
      textAlign: "left",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "800",
      color: "#ff4b5c",
      textAlign: "center",
      marginBottom: "30px",
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    content: {
      fontSize: "1rem",
      lineHeight: 1.7,
      color: "#e0e0e0",
    },
    sectionHeader: {
      fontSize: "1.6rem",
      color: "#ff4b5c",
      marginTop: "25px",
      fontWeight: "bold",
    },
    list: {
      paddingLeft: "20px",
    },
    paragraph: {
      marginBottom: "15px",
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Website Privacy Policy</h1>
      <div style={styles.content}>
        <p style={styles.paragraph}>
          This privacy policy will help you understand how WeCare EHS uses and protects the data you provide to us when you visit and use <a href='https://www.wecareehs.org'>https://www.wecareehs.org</a>.
        </p>
        <p style={styles.paragraph}>
          We reserve the right to change this policy at any given time, of which you will be promptly updated. If you want to make sure that you are up to date with the latest changes, we advise you to frequently visit this page.
        </p>

        <h2 style={styles.sectionHeader}>What User Data We Collect</h2>
        <ul style={styles.list}>
          <li>Your IP address.</li>
          <li>Your contact information and email address.</li>
          <li>Other information such as interests and preferences.</li>
          <li>Data profile regarding your online behavior on our website.</li>
        </ul>

        <h2 style={styles.sectionHeader}>Why We Collect Your Data</h2>
        <ul style={styles.list}>
          <li>To better understand your needs.</li>
          <li>To improve our services and products.</li>
          <li>To send you promotional emails containing the information we think you will find interesting.</li>
          <li>To contact you to fill out surveys and participate in market research.</li>
          <li>To customize our website according to your online behavior.</li>
        </ul>

        <h2 style={styles.sectionHeader}>Safeguarding and Securing the Data</h2>
        <p style={styles.paragraph}>
          WeCare EHS is committed to securing your data and keeping it confidential. WeCare EHS has done all in its power to prevent data theft, unauthorized access, and disclosure by implementing the latest technologies and software, which help us safeguard all the information we collect online.
        </p>

        <h2 style={styles.sectionHeader}>Our Cookie Policy</h2>
        <p style={styles.paragraph}>
          Once you agree to allow our website to use cookies, you also agree to use the data it collects regarding your online behavior (analyze web traffic, web pages you visit and spend the most time on).
        </p>
        <p style={styles.paragraph}>
          The data we collect by using cookies is used to customize our website to your needs. After we use the data for statistical analysis, the data is completely removed from our systems.
        </p>

        <h2 style={styles.sectionHeader}>Restricting the Collection of your Personal Data</h2>
        <p style={styles.paragraph}>
          At some point, you might wish to restrict the use and collection of your personal data. You can achieve this by doing the following:
        </p>
        <ul style={styles.list}>
          <li>When filling out forms on the website, check for a box you can leave unchecked if you do not want to disclose your personal information.</li>
          <li>If you have already agreed to share your information with us, contact us via email to update your preferences.</li>
        </ul>
        <p style={styles.paragraph}>
          WeCare EHS will not lease, sell, or distribute your personal information to any third parties, unless required by law. Your personal information will be used when we need to send you promotional materials if you agree to this privacy policy.
        </p>
        <p style={styles.paragraph}>By using this website, you agree to the above-mentioned privacy policy.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
