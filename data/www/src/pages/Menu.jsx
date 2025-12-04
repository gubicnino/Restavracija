import '../styles/Menu.css';
import PageTitle from '../components/common/PageTitle';
function Menu() {
  return (
    <div className="menu">
      <PageTitle title="Meni" description="Odkrijte našo ponudbo vrhunskih steakov in jedi" />

      <div className="menu-content">
        <div className="menu-category">
          <h2>Premium Steaki</h2>
          <div className="menu-items">
            <div className="menu-item">
              <div className="menu-item-header">
                <h3>Ribeye Steak</h3>
                <span className="menu-item-price">42€</span>
              </div>
              <p className="menu-item-description">
                300g najboljšega ribeye steaka, zorjen 28 dni, z bogatim okusom in marmorirano strukturo.
                Postreženo z žarjeno zelenjavo in domačim krompirjem.
              </p>
            </div>

            <div className="menu-item">
              <div className="menu-item-header">
                <h3>Filet Mignon</h3>
                <span className="menu-item-price">48€</span>
              </div>
              <p className="menu-item-description">
                250g najbolj nežnega steaka, popolnoma zrezek, postrežen z zelenjavo po izbiri 
                in trufljevim pirejem.
              </p>
            </div>

            <div className="menu-item">
              <div className="menu-item-header">
                <h3>T-Bone Steak</h3>
                <span className="menu-item-price">52€</span>
              </div>
              <p className="menu-item-description">
                450g klasičnega T-bone steaka, kombinacija fileya in striploina. 
                Postreženo z pečenim krompirjem in sezonsko zelenjavo.
              </p>
            </div>

            <div className="menu-item">
              <div className="menu-item-header">
                <h3>Wagyu Ribeye</h3>
                <span className="menu-item-price">85€</span>
              </div>
              <p className="menu-item-description">
                200g japonskega wagyu mesa A5 kakovosti. Neprimerljiv okus in tekstura, 
                najboljša izbira za prave ljubitelje mesa.
              </p>
            </div>
          </div>
        </div>

        <div className="menu-category">
          <h2>Predjedi</h2>
          <div className="menu-items">
            <div className="menu-item">
              <div className="menu-item-header">
                <h3>Carpaccio iz govejega fileya</h3>
                <span className="menu-item-price">16€</span>
              </div>
              <p className="menu-item-description">
                Tanko narezani filé, parmezan, rucola, trufljev olje in limona.
              </p>
            </div>

            <div className="menu-item">
              <div className="menu-item-header">
                <h3>Tatarski biftek</h3>
                <span className="menu-item-price">18€</span>
              </div>
              <p className="menu-item-description">
                Ročno sekljano goveje meso, kaprami, rdečo čebulo in svežo rumenjak.
              </p>
            </div>
          </div>
        </div>

        <div className="menu-category">
          <h2>Priloge</h2>
          <div className="menu-items">
            <div className="menu-item">
              <div className="menu-item-header">
                <h3>Trufljev pire</h3>
                <span className="menu-item-price">8€</span>
              </div>
              <p className="menu-item-description">
                Kremast krompirjev pire s svežim trufljem.
              </p>
            </div>

            <div className="menu-item">
              <div className="menu-item-header">
                <h3>Žarjena zelenjava</h3>
                <span className="menu-item-price">7€</span>
              </div>
              <p className="menu-item-description">
                Sezonska zelenjava, žarjena do popolnosti.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
