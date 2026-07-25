const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

function buildUrl(path: string): string {
  if (!path.startsWith("/")) {
    throw new Error(`Invalid API path: ${path}`);
  }

  return `${API_BASE_URL}${path}`;
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(buildUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorBody = (await response.json()) as { message?: string; detail?: string };
      if (errorBody.message) {
        message = errorBody.message;
      } else if (errorBody.detail) {
        message = errorBody.detail;
      }
    } catch {
      // Ignore JSON parse errors and keep fallback message.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
