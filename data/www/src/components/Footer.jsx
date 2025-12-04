import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Prime Cuts</h3>
          <p>Vrhunski steakhouse z najkvalitetnejšim mesom in nepozabno izkušnjo.</p>
        </div>
        
        <div className="footer-section">
          <h3>Delovni Čas</h3>
          <p>Ponedeljek - Četrtek: 17:00 - 23:00</p>
          <p>Petek - Sobota: 17:00 - 01:00</p>
          <p>Nedelja: Zaprto</p>
        </div>
        
        <div className="footer-section">
          <h3>Kontakt</h3>
          <p>Glavni trg 15, Ljubljana</p>
          <p>Tel: +386 1 234 5678</p>
          <p>Email: info@primecuts.si</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Prime Cuts Steakhouse. Vse pravice pridržane.</p>
      </div>
    </footer>
  );
}

export default Footer;
