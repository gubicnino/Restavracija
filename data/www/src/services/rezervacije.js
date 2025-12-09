import api from './api';

// Pridobi vse rezervacije
export const pridobiRezervacije = () => {
  return api.get('/api/rezervacije/rezervacije.php').then(res => res.data);
};

// Ustvari novo rezervacijo
export const ustvariRezervacijo = (rezervacijaData) => {
    return api.post('/api/rezervacije/ustvari_rezervacijo.php', rezervacijaData).then(res => res.data);
};

export const potrdiRezervacijo = (id) => {
    return api.post('/api/rezervacije/potrdi_rezervacijo.php', { id }).then(res => res.data);
};

export const zavrniRezervacijo = (id) => {
    return api.post('/api/rezervacije/zavrni_rezervacijo.php', { id }).then(res => res.data);
};

export const izbrisiRezervacijo = (id) => {
    return api.post('/api/rezervacije/izbrisi_rezervacijo.php', { id }).then(res => res.data);
};

export const urediRezervacijo = (id, rezervacijaData) => {
    return api.post('/api/rezervacije/uredi_rezervacijo.php', { id, ...rezervacijaData }).then(res => res.data);
};