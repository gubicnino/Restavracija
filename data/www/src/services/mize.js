import api from './api';

// Pridobi mize
export const pridobiMize = () => {
  return api.get('/api/mize.php').then(res => res.data);
};
// Pridobi rezervacije za določeno mizo
export const pridobiRezervacijeZaMizo = (mizaId) => {
    return api.get(`/api/rezervacije_mize.php?table_id=${mizaId}`).then(res => res.data);
}