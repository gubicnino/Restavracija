import api from "./api";

export const pridobiUporabnike = () => {
  return api.get('/api/uporabniki/uporabniki.php').then(res => res.data);
};

export const ustvariUporabnika = (uporabnikData) => {
    return api.post('/api/register.php', uporabnikData).then(res => res.data);
};

export const posodobiUporabnika = (id, uporabnikData) => {
    return api.post('/api/uporabniki/posodobi_uporabnika.php', { id, ...uporabnikData }).then(res => res.data);
};

export const izbrisiUporabnika = (id) => {
    return api.post('/api/uporabniki/izbrisi_uporabnika.php', { id }).then(res => res.data);
}