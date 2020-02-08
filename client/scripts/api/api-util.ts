/**
 * Util class for easily making API calls via fetch()
 */
export default class ApiUtil {
  private static HEADERS: HeadersInit = {
    'content-type': 'application/json'
  };

  /**
   * Make a POST request
   * @param {string} url the url to query
   * @param body the body of the request
   * @return {Promise<object>} the response body
   */
  public static async post<T>(url: string, body: object): Promise<T> {
    const options: RequestInit = {
      body: JSON.stringify(body),
      method: 'POST',
      headers: ApiUtil.HEADERS
    };
    return ApiUtil.doFetch(url, options);
  }

  /**
   * Make a GET request
   * @param {string} url the url to query
   * @return {Promise<object>} the response body
   */
  public static async get<T>(url: string): Promise<T> {
    const options: RequestInit = {
      headers: ApiUtil.HEADERS
    };
    return ApiUtil.doFetch(url, options);
  }

  public static async doFetch<T>(url: string, options: RequestInit): Promise<T> {
    const response: Response = await fetch(url, options);
    if (response.ok && response.status === 200) {
      return response.json();
    } else {
      const errorMessage = await response.text();
      throw new Error(`Server responded with status code ${response.status}: ${errorMessage}`);
    }
  }
}
