import api from './api';

// Pridobi mize
export const pridobiMize = () => {
  return api.get('/api/mize/mize.php').then(res => res.data);
};

// Pridobi rezervacije za določeno mizo
export const pridobiRezervacijeZaMizo = (mizaId) => {
    return api.get(`/api/rezervacije_mize.php?table_id=${mizaId}`).then(res => res.data);
}

export const ustvariMizo = (mizaData) => {
    return api.post('/api/mize/ustvari_mizo.php', mizaData).then(res => res.data);
};

export const posodobiMizo = (id, mizaData) => {
    return api.post('/api/mize/posodobi_mizo.php', { id, ...mizaData }).then(res => res.data);
};

export const izbrisiMizo = (id) => {
    return api.post('/api/mize/izbrisi_mizo.php', { id }).then(res => res.data);
};