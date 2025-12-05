import api from './api';

// Pridobi vse rezervacije
export const pridobiRezervacije = () => {
  return api.get('/api/rezervacije.php').then(res => res.data);
};

// Ustvari novo rezervacijo
export const ustvariRezervacijo = (rezervacijaData) => {
    return api.post('/api/ustvari_rezervacijo.php', rezervacijaData).then(res => res.data);
}