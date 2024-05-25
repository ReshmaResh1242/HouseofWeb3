import axios, { AxiosResponse } from "axios";

const baseURL = "https://www.googleapis.com/books/v1/";
const API_KEY = 'AIzaSyCdSrpvzclbVi6uEtlOvdS3GNbpxdDe04U'; 

interface BookListResponse {
    items: any[];
}

export const api = {
    getBookList: (data: string): Promise<AxiosResponse<BookListResponse>> => {
        return axios.get(`${baseURL}volumes?q=${data?data:'a'}&key=${API_KEY}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
};
