import api from './api';

//pridobi vse proste termine za izbran datum in število oseb
export const pridobiProsteTermine = (datum, stevilo_oseb) => {
  return api.get('/api/prosti_termini.php', { params: { datum, stevilo_oseb } }).then(res => res.data);
};