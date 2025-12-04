import React,{ useEffect, useState }   from 'react'
import Button from './Button'
import { pridobiRezervacijeZaMizo } from '../services/mize';

export default function Miza({ id, stevilka, kapaciteta, lokacija }) {
    const [rezervacije, setRezervacije] = useState([]);
      useEffect(() => {
        fetchRezervacije();
      }, []);   
      const fetchRezervacije = async () => {
        try {
          const response = await pridobiRezervacijeZaMizo(id);
          if (response.success){
            setRezervacije(response.data);
          }
        }
        catch (error) {
          console.error('Napaka pri pridobivanju rezervacij:', error);
        }
      };
    return (
        <div className='miza-card'>
            <h3>Miza stevilka: {stevilka}</h3>
            <ul className="miza-podrobnosti">
                <li>Kapaciteta: {kapaciteta} osebe</li>
                <li>Lokacija: {lokacija}</li>
            </ul>
            <ul>
                <li><strong>Rezervacije:</strong></li>
                {console.log(rezervacije)}
                {rezervacije.length === 0 ? (
                    <li>Ni rezervacij</li>
                ) : (
                    rezervacije.map((rezervacija) => (
                        <li key={rezervacija.reservation_id}>
                            {rezervacija.datum} od {rezervacija.cas_od} do {rezervacija.cas_do}
                        </li>
                    ))
                )}
            </ul>
            <div className="button-wrapper">
                <Button variant="primary" onClick={handleMizaClick}>Rezerviraj</Button>
            </div>
        </div>
    )
}

function handleMizaClick() {
    alert('Funkcija rezervacije mize še ni implementirana.');
}