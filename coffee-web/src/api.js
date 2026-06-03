const API_BASE_URL = 'http://localhost:5194/api'; // Standard ASP.NET Core port

export const api = {
  // Products
  getProducts: async (category) => {
    const url = new URL(`${API_BASE_URL}/products`);
    if (category && category !== 'All') url.searchParams.append('category', category);
    const response = await fetch(url);
    return response.json();
  },
  getSecretProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products/secret`);
    return response.json();
  },
  getRoastDate: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/roast-date/${id}`);
    return response.json();
  },
  updateProduct: async (id, productData) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
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
    const response = await fetch(`${API_BASE_URL}/orders?email=${email || ''}`);
    return response.json();
  },
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  // Flavor Journal
  getJournal: async (email) => {
    const response = await fetch(`${API_BASE_URL}/journal?email=${email || ''}`);
    return response.json();
  },
  saveJournalEntry: async (entry) => {
    const response = await fetch(`${API_BASE_URL}/journal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    return response.json();
  },
  getPreviousNote: async (productId, email) => {
    const response = await fetch(`${API_BASE_URL}/journal/previous/${productId}?email=${email}`);
    if (response.status === 404) return null;
    return response.json();
  },

  // Admin Stats
  getToppingStats: async () => {
    const response = await fetch(`${API_BASE_URL}/orders/stats/toppings`);
    return response.json();
  }
};
