import axios, {AxiosResponse as Response, AxiosRequestConfig as RequestConfig} from 'axios';

class BaseAPI {
    axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 10000
    });

    _reallyMakeRequest(requestConfig: RequestConfig | undefined) : Promise<Response> {
        return new Promise((resolve, reject) => {
            if (requestConfig === undefined) {
                reject();
                return;
            }

            this.axiosInstance.request(requestConfig)
                .then(resolve)
                .catch(reject);
        });
    }

    _getPath(url: (string | number)[]): string {
        return url.join('/');
    }

    getAll<T>(url: (string | number)[]): Promise<T[]> {
        return new Promise((resolve, reject) => {
            const requestConfig = {
                url: this._getPath(url),
                method: 'GET'
            } as RequestConfig;

            this._reallyMakeRequest(requestConfig)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    get<T>(url: (string | number)[]): Promise<T> {
        return new Promise((resolve, reject) => {
            const requestConfig = {
                url: this._getPath(url),
                method: 'GET'
            } as RequestConfig;

            this._reallyMakeRequest(requestConfig)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    post<T>(url: (string | number)[], data: any, contentType = 'application/json'): Promise<T> {
        return new Promise((resolve, reject) => {
            const requestConfig = {
                url: this._getPath(url),
                method: 'POST',
                data: data,
                headers: {
                    'content-type': contentType
                }
            } as RequestConfig;

           this._reallyMakeRequest(requestConfig)
               .then(response => {
                   resolve(response.data);
               })
               .catch(error => {
                   reject(error);
               });
        });
    }

    delete(url: (string | number)[]): Promise<Response> {
        return new Promise((resolve, reject) => {
            const requestConfig = {
                url: this._getPath(url),
                method: 'DELETE'
            } as RequestConfig;

            this._reallyMakeRequest(requestConfig)
                .then(resolve)
                .catch(reject);
        });
    }

    put<T>(url: (string | number)[], data: any, contentType = 'application/json'): Promise<T> {
        return new Promise((resolve, reject) => {
            const requestConfig = {
                url: this._getPath(url),
                method: 'PUT',
                data: data,
                headers: {
                    'content-type': contentType
                }
            } as RequestConfig;

            this._reallyMakeRequest(requestConfig)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export default BaseAPI;