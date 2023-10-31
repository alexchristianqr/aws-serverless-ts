import axios, { AxiosError, AxiosRequestConfig, AxiosStatic, isAxiosError } from "axios"
import { ErrorResponseService } from "../responses"

interface CI_AxiosRequestConfig extends AxiosRequestConfig {
  headers?: Record<string, string>
  isPublic?: boolean
  isBlob?: boolean
}

class HttpAdapterService {
  private config: AxiosRequestConfig = {}

  constructor(baseUrl: string) {
    axios.defaults.baseURL = baseUrl
  }

  throwError(error: AxiosError | any) {
    if (isAxiosError(error)) {
      return new ErrorResponseService().apiResponse({ error })
    } else {
      console.error(error)
    }
  }

  getHTTPClient(config?: CI_AxiosRequestConfig): AxiosStatic {
    if (config?.isPublic) this.removeHeader()
    return axios
  }

  removeHeader() {
    axios.defaults.headers.common = {}
  }

  async get(url: string, config?: CI_AxiosRequestConfig): Promise<any> {
    try {
      return this.getHTTPClient(config).get(url, this.config)
    } catch (error) {
      return this.throwError(error)
    }
  }

  async post<T>(url: string, data?: T | Record<string, unknown>, config?: CI_AxiosRequestConfig): Promise<any> {
    try {
      this.config = {
        responseType: config?.isBlob ? "blob" : "json",
        headers: {
          ...config?.headers
        }
      }
      return this.getHTTPClient(config).post(url, data, this.config)
    } catch (error) {
      return this.throwError(error)
    }
  }

  async put<T>(url: string, data?: T | Record<string, unknown>, config?: CI_AxiosRequestConfig): Promise<any> {
    try {
      return this.getHTTPClient(config).put(url, data, this.config)
    } catch (error) {
      return this.throwError(error)
    }
  }

  async patch(url: string, data?: Record<string, unknown>, config?: CI_AxiosRequestConfig): Promise<any> {
    try {
      return this.getHTTPClient(config).patch(url, data, this.config)
    } catch (error) {
      return this.throwError(error)
    }
  }

  async delete(url: string, data?: Record<string, unknown>, config?: CI_AxiosRequestConfig): Promise<any> {
    try {
      this.config = { data }
      return this.getHTTPClient(config).delete(url, this.config)
    } catch (error) {
      return this.throwError(error)
    }
  }

  // --

  async getBlob(url: string, config?: CI_AxiosRequestConfig) {
    try {
      this.config = {
        responseType: "blob"
      }
      return this.getHTTPClient(config).get(url, this.config)
    } catch (error) {
      return this.throwError(error)
    }
  }

  async upload(url: string, data?: Record<string, unknown>, config?: CI_AxiosRequestConfig) {
    try {
      this.config = {
        headers: {
          "Content-Type": "multipart/form-data",
          ...config?.headers
        }
      }
      return this.getHTTPClient(config).postForm(url, data, this.config)
    } catch (error) {
      return this.throwError(error)
    }
  }

  async uploadPut(url: string, data?: Record<string, unknown>, config?: CI_AxiosRequestConfig) {
    try {
      this.config = {
        headers: {
          ...config?.headers,
          "Content-Type": "multipart/form-data"
        }
      }
      return this.getHTTPClient(config).put(url, data, this.config)
    } catch (error) {
      return this.throwError(error)
    }
  }
}

export const httpAdapterService = new HttpAdapterService("MY_URL_ENDPOINT")
