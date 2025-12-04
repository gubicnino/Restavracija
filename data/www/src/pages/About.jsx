import PageTitle from '../components/common/PageTitle';
import '../styles/About.css';

function About() {
  return (
    <div className="about">
      <PageTitle title="O Prime Cuts" description="Strast do mesa, predanost odličnosti" />
      <div className="about-content">
        <div className="about-section">
          <h2>Naša Zgodba</h2>
          <p>
            Prime Cuts je bil ustanovljen leta 2015 z eno samo vizijo - ponuditi najboljšo steakhouse 
            izkušnjo v Ljubljani. Naša strast do vrhunskega mesa in odličnosti v kulinariki nas je 
            vodila skozi vsa ta leta.
          </p>
          <p>
            Vsak steak, ki ga postrežemo, je skrbno izbran iz najboljših virov, zorjen do popolnosti 
            in pripravljen z največjo pozornostjo. Naš tim chef-ov ima več kot 20 let izkušenj v 
            vrhunski gastronomiji.
          </p>
        </div>

        <div className="about-section">
          <h2>Naše Vrednote</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Kakovost</h3>
              <p>Uporabljamo samo najboljše sestavine, od premium mesa do svežih lokalnih izdelkov.</p>
            </div>
            <div className="value-item">
              <h3>Mojstrstvo</h3>
              <p>Naši chefi so strokovnjaki, ki obvladajo umetnost priprave popolnega steaka.</p>
            </div>
            <div className="value-item">
              <h3>Izkušnja</h3>
              <p>Vsak obisk je več kot le obrok - to je nepozabna kulinarična dogodivščina.</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Naša Filozofija</h2>
          <p>
            Verjamemo, da je popoln steak kombinacija najboljšega mesa, strokovne priprave in 
            pozornosti do vsakega detajla. Vsaka jed, ki zapusti našo kuhinjo, je mojstrovina.
          </p>
          <p>
            Naša zaveza je ponuditi vsakemu gostu edinstveno izkušnjo, kjer se srečata tradicija 
            in sodobna kulinarika, vse v elegantni in ekskluzivni atmosferi.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
