const getBase = () => process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type ApiOptions = Omit<RequestInit, "body"> & { body?: unknown };

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { body, ...rest } = options;
  const res = await fetch(`${getBase()}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(rest.headers as Record<string, string>),
    },
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error ?? res.statusText);
  }

  return res.json() as Promise<T>;
}

export type User = {
  _id: string;
  email: string;
  name?: string;
  picture?: string;
  role: string;
};

