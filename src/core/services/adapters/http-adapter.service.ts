import axios, { AxiosRequestConfig, AxiosResponse, AxiosStatic, isAxiosError } from "axios"

class ResponseError extends Error {
  private declare status: number | undefined
  private declare data?: unknown

  constructor(error: AxiosResponse | undefined) {
    super(error?.data.message)
    this.status = error?.status
    this.message = error?.data.message
    this.data = error?.data
  }
}

interface IHttpOptions {
  isPublic?: boolean
  headers?: Record<string, string>
  isBlob?: boolean
}

class HttpAdapterService {
  constructor(baseUrl: string) {
    axios.defaults.baseURL = baseUrl
  }

  getHTTPClient(options?: IHttpOptions): AxiosStatic {
    if (options?.isPublic) this.removeHeader()
    return axios
  }

  removeHeader() {
    axios.defaults.headers.common = {}
  }

  async get(url: string, options?: IHttpOptions): Promise<any> {
    try {
      const config: AxiosRequestConfig = {}
      return this.getHTTPClient(options).get(url, config)
    } catch (error) {
      if (isAxiosError(error)) throw new ResponseError(error.response)
      else console.error(error)
    }
  }

  async post<T>(url: string, data?: T | Record<string, unknown>, options?: IHttpOptions): Promise<any> {
    try {
      const config: AxiosRequestConfig = {
        responseType: options?.isBlob ? "blob" : "json",
        headers: {
          ...options?.headers
        }
      }
      return this.getHTTPClient(options).post(url, data, config)
    } catch (error) {
      if (isAxiosError(error)) throw new ResponseError(error.response)
      else console.error(error)
    }
  }

  async put<T>(url: string, data?: T | Record<string, unknown>, options?: IHttpOptions): Promise<any> {
    try {
      return this.getHTTPClient(options).put(url, data)
    } catch (error) {
      if (isAxiosError(error)) throw new ResponseError(error.response)
      else console.error(error)
    }
  }

  async patch(url: string, data?: Record<string, unknown>, options?: IHttpOptions): Promise<any> {
    try {
      return this.getHTTPClient(options).patch(url, data)
    } catch (error) {
      if (isAxiosError(error)) throw new ResponseError(error.response)
      else console.error(error)
    }
  }

  async delete(url: string, data?: Record<string, unknown>, options?: IHttpOptions): Promise<any> {
    try {
      const config: AxiosRequestConfig = { data }
      return this.getHTTPClient(options).delete(url, config)
    } catch (error) {
      if (isAxiosError(error)) throw new ResponseError(error.response)
      else console.error(error)
    }
  }

  // --

  async getBlob(url: string, options?: IHttpOptions) {
    try {
      const config: AxiosRequestConfig = {
        responseType: "blob"
      }
      return this.getHTTPClient(options).get(url, config)
    } catch (error) {
      if (isAxiosError(error)) throw new ResponseError(error.response)
      else console.error(error)
    }
  }

  async upload(url: string, data?: Record<string, unknown>, options?: IHttpOptions) {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
          ...options?.headers
        }
      }
      return this.getHTTPClient(options).postForm(url, data, config)
    } catch (error) {
      if (isAxiosError(error)) throw new ResponseError(error.response)
      else console.error(error)
    }
  }

  async uploadPut(url: string, data?: Record<string, unknown>, options?: IHttpOptions) {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          ...options?.headers,
          "Content-Type": "multipart/form-data"
        }
      }
      return this.getHTTPClient(options).put(url, data, config)
    } catch (error) {
      if (isAxiosError(error)) throw new ResponseError(error.response)
      else console.error(error)
    }
  }
}

export const httpAdapterService = new HttpAdapterService("MY_URL_ENDPOINT")
