import api from "./api";

export const pridobiMeniIteme = () => {
    return api.get('/api/meni/meni_items.php').then(res => res.data);
};