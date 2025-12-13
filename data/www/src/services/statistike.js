import api from "./api";

export const narediExcelStatistik = (year) => {
    return api.get(`/api/statistike/statistike_excel.php?year=${year}`, {
        responseType: 'blob'
    });}