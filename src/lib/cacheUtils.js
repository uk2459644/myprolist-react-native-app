export function getCachedProductById(queryClient, id) {
  if (!id) return undefined;

  // 1) direct single-product cache
  const single = queryClient.getQueryData(['product', id]);
  if (single) return single;

  // 2) search only queries whose key starts with 'products'
  const cached = queryClient.getQueriesData(['products']);
  for (const [, data] of cached) {
    if (!data) continue;
    const items = data.pages ? data.pages.flat() : Array.isArray(data) ? data : [];
    const found = items.find((p) => p?.id === id);
    if (found) return found;
  }

  return undefined;
}