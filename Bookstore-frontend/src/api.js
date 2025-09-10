export async function listBooks() {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/catalog/books`);
  return res.json();
}