import axios from "axios";

const baseURL = "https://www.googleapis.com/books/v1/";
const API_KEY = 'AIzaSyCdSrpvzclbVi6uEtlOvdS3GNbpxdDe04U';

export const api = {

    // ---------------- Get BookList Api -----------------
    getBookList: (data) => {
        return axios.get(`${baseURL}volumes?q=${data}/&key=${API_KEY}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    },

};