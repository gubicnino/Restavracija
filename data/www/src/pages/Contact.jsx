import '../styles/Contact.css';
import PageTitle from '../components/common/PageTitle';
import { GoldButton } from '../components/common/Button';

function Contact() {
  return (
    <div className="contact">
      <PageTitle title="Kontakt" description="Obrnite se na nas za rezervacije ali dodatne informacije" />

      <div className="contact-content">
        <div className="contact-info">
          <h2>Kontaktni Podatki</h2>
          
          <div className="info-item">
            <h3>Naslov</h3>
            <p>Glavni trg 15</p>
            <p>1000 Ljubljana, Slovenija</p>
          </div>

          <div className="info-item">
            <h3>Telefon</h3>
            <p>+386 1 234 5678</p>
            <p>+386 40 123 456</p>
          </div>

          <div className="info-item">
            <h3>Email</h3>
            <p>info@primecuts.si</p>
            <p>rezervacije@primecuts.si</p>
          </div>

          <div className="info-item">
            <h3>Delovni Čas</h3>
            <p>Ponedeljek - Četrtek: 17:00 - 23:00</p>
            <p>Petek - Sobota: 17:00 - 01:00</p>
            <p>Nedelja: Zaprto</p>
          </div>
        </div>

        <div className="reservation-info">
          <h2>Rezervacije</h2>
          <p>
            Priporočamo rezervacijo mize, še posebej za večje skupine in ob vikendih. 
            Rezervacije sprejemamo telefonsko ali preko emaila.
          </p>
          <p>
            Za posebne dogodke, zasebne večerje ali groups večje od 8 oseb nas prosimo 
            kontaktirajte vsaj 48 ur vnaprej.
          </p>
          <p>
            Veselimo se vašega obiska v Prime Cuts!
          </p>
          <GoldButton variant="primary">Rezerviraj Mizo</GoldButton>

          <div style={{ marginTop: 'var(--spacing-md)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
            <h3 style={{ color: 'var(--color-accent)', marginBottom: 'var(--spacing-sm)' }}>Sledite Nam</h3>
            <p>Instagram: @primecuts_lj</p>
            <p>Facebook: Prime Cuts Ljubljana</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
