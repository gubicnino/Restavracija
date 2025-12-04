import React, { use, useEffect, useState } from 'react'
import PageTitle from '../components/common/PageTitle'
import { pridobiMize } from '../services/mize'
import Miza from '../components/Miza'
import '../styles/Mize.css'

export default function Mize() {
  const [mize, setMize] = useState([]);
  useEffect(() => {
    fetchMize();
  }, []);
  const fetchMize = async () => {
    try {
      const response = await pridobiMize();
      if (response.success){
        setMize(response.data);
      }
    }
    catch (error) {
      console.error('Napaka pri pridobivanju miz:', error);
    }
  };
  return (
    <div className='mize'>
        <PageTitle title="Mize" description="Rezervirajte svojo mizo pri nas" />
        <div className='mize-content'>
          <div className="mize-wrapper">
            {mize.map((miza) => (
              <Miza 
                key={miza.table_id}
                id={miza.table_id}
                stevilka={miza.stevilka}
                kapaciteta={miza.kapaciteta}
                lokacija={miza.lokacija}
              />
            ))}
          </div>
        </div>
    </div>
  )
}



