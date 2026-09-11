export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

const API_BASE = '/api';

async function request<T>(endpoint: string, options: RequestInit = {}, timeoutMs = 45000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        ...(options.headers || {}),
      },
    });

    const text = await res.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (!res.ok) {
      throw new ApiError(
        res.status,
        data?.error || `Request failed with status ${res.status}`,
        data?.code
      );
    }

    return data as T;
  } catch (err: any) {
    if (err instanceof ApiError) throw err;
    if (err?.name === 'AbortError') {
      throw new ApiError(0, 'The request timed out. Please try again.');
    }
    throw new ApiError(0, 'Network error — please check your connection and try again.');
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body: any) =>
    request<T>(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
  postForm: <T>(endpoint: string, formData: FormData, timeoutMs = 60000) =>
    request<T>(
      endpoint,
      {
        method: 'POST',
        body: formData,
      },
      timeoutMs
    ),
};
