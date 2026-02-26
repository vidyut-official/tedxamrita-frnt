const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
type RequestOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    body?: any;
}

export async function apiRequest<T = any>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        // Handle DRF style errors
        if (data?.error) throw new Error(data.error);
        if (data?.detail) throw new Error(data.detail);

        // Field validation errors
        if (typeof data === "object") {
            const firstError = Object.values(data)[0];
            if (Array.isArray(firstError)) {
                throw new Error(firstError[0]);
            }
        }

        throw new Error(`API Error: ${res.status}`);
    }

    return data;
}