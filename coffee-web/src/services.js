const getApiBaseUrl = () => {
  // If running on a Vercel deployment, route API requests through Vercel's HTTPS rewrites/proxy
  // to prevent Mixed Content (HTTP on HTTPS) and ERR_CONNECTION_RESET (no HTTPS/SSL support on site4future)
  if (typeof window !== 'undefined' && window.location.hostname.endsWith('vercel.app')) {
    console.warn('[API] Vercel deployment detected. Routing requests via HTTPS relative proxy to prevent Mixed Content/Connection Reset.');
    return '/api-proxy';
  }

  const url = import.meta.env.VITE_API_URL;
  if (!url) {
    console.warn("VITE_API_URL is undefined. Defaulting to http://localhost:5194");
    return "http://localhost:5194";
  }

  let cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  if (typeof window !== 'undefined' &&
      window.location.protocol === 'https:' &&
      cleanUrl.startsWith('http:')) {
    cleanUrl = cleanUrl.replace('http:', 'https:');
    console.warn('[API] Auto-upgraded to HTTPS:', cleanUrl);
  }

  return cleanUrl;
};

const API_BASE_URL = getApiBaseUrl();

const apiFetch = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(errorText || `Lỗi server: ${response.status} ${response.statusText}`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

export const api = {
  getProducts: async (category) => {
    let url;
    if (API_BASE_URL && (API_BASE_URL.startsWith('http://') || API_BASE_URL.startsWith('https://'))) {
      url = new URL(`${API_BASE_URL}/api/products`);
    } else {
      const base = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5194';
      url = new URL(`${API_BASE_URL}/api/products`, base);
    }
    if (category && category !== 'All') url.searchParams.append('category', category);
    return apiFetch(url);
  },
  getSecretProducts: async () => apiFetch(`${API_BASE_URL}/api/products/secret`),
  getRoastDate: async (id) => apiFetch(`${API_BASE_URL}/api/products/roast-date/${id}`),
  updateProduct: async (id, productData) => apiFetch(`${API_BASE_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  }),
  getOrders: async (email) => apiFetch(`${API_BASE_URL}/api/orders?email=${email || ''}`),
  createOrder: async (orderData) => apiFetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  }),
  getJournal: async (email) => apiFetch(`${API_BASE_URL}/api/journal?email=${email || ''}`),
  saveJournalEntry: async (entry) => apiFetch(`${API_BASE_URL}/api/journal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  }),
  getPreviousNote: async (productId, email) => {
    const response = await fetch(`${API_BASE_URL}/api/journal/previous/${productId}?email=${email}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Lỗi server: ${response.status}`);
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  },
  getToppingStats: async () => apiFetch(`${API_BASE_URL}/api/orders/stats/toppings`),
};
