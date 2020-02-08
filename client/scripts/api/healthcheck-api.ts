import ApiUtil from './api-util';

export default class HealthcheckAPI {
  public static async ping(): Promise<void> {
    await ApiUtil.get<void>('/api/healthcheck');
  }
}
