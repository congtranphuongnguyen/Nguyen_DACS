const getApiBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL;
  if (!url) {
    console.warn("VITE_API_URL is undefined. Defaulting to http://localhost:5194");
    return "http://localhost:5194";
  }
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

const API_BASE_URL = getApiBaseUrl();

export const api = {
  // Products
  getProducts: async (category) => {
    const url = new URL(`${API_BASE_URL}/api/products`);
    if (category && category !== 'All') url.searchParams.append('category', category);
    const response = await fetch(url);
    return response.json();
  },
  getSecretProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/api/products/secret`);
    return response.json();
  },
  getRoastDate: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/products/roast-date/${id}`);
    return response.json();
  },
  updateProduct: async (id, productData) => {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Lỗi server: ${response.status}`);
    }
    
    const text = await response.text();
    return text ? JSON.parse(text) : { success: true };
  },

  // Orders
  getOrders: async (email) => {
    const response = await fetch(`${API_BASE_URL}/api/orders?email=${email || ''}`);
    return response.json();
  },
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  // Flavor Journal
  getJournal: async (email) => {
    const response = await fetch(`${API_BASE_URL}/api/journal?email=${email || ''}`);
    return response.json();
  },
  saveJournalEntry: async (entry) => {
    const response = await fetch(`${API_BASE_URL}/api/journal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    return response.json();
  },
  getPreviousNote: async (productId, email) => {
    const response = await fetch(`${API_BASE_URL}/api/journal/previous/${productId}?email=${email}`);
    if (response.status === 404) return null;
    return response.json();
  },

  // Admin Stats
  getToppingStats: async () => {
    const response = await fetch(`${API_BASE_URL}/api/orders/stats/toppings`);
    return response.json();
  }
};
