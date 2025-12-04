import '../styles/Home.css';
import Button from '../components/Button';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>STEAK HOUSE</h1>
          <p>Nepozabna kulinarična izkušnja v srcu Ljubljane</p>
          <Button variant="primary">Rezerviraj Mizo</Button>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <h2>Zakaj STEAK HOUSE?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Premium Meso</h3>
              <p>Uporabljamo samo najboljše meso iz certificiranih virov, zorjeno do popolnosti.</p>
            </div>
            <div className="feature-card">
              <h3>Mojstrsko Pripravljen</h3>
              <p>Naši chefi so strokovnjaki za pripravo steakov z več kot 20 leti izkušenj.</p>
            </div>
            <div className="feature-card">
              <h3>Ekskluzivna Atmosfera</h3>
              <p>Uživajte v luksuznem ambientu z vrhunsko storitvijo in pozornostjo do detajlov.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
