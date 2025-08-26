const API_BASE = process.env.REACT_APP_API_URL;

export async function get(path, { params, headers } = {}) {
  const url = new URL(`${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`);
  if (params)
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const response = await fetch(url.toString(), {
    headers,
    credentials: "include",
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export async function mutate(path, { method = "POST", body, headers } = {}) {
  const response = await fetch(
    `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`,
    {
      method,
      headers: { "Content-Type": "application/json", ...headers },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    }
  );

  if (!response.ok) throw new Error(await response.text());
  return response.json();
}
