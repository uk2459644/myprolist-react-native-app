import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async ({ pageParam = 1, queryKey }) => {
  const [_key, searchTerm] = queryKey;
  const limit = 10; // number of products per page

  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const allProducts = await res.json();

  // Simulate pagination
  const start = (pageParam - 1) * limit;
  const end = start + limit;
  let paginated = allProducts.slice(start, end);

  // Optional search filter
  if (searchTerm) {
    const lower = searchTerm.toLowerCase();
    paginated = paginated.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
    );
  }

  const totalPages = Math.ceil(allProducts.length / limit);
  const hasMore = pageParam < totalPages;

  return {
    data: paginated,
    nextPage: hasMore ? pageParam + 1 : undefined,
    hasMore,
  };
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};
