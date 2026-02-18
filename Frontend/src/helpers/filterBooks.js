// filterBooks.js
// Helper to filter books by title or author (case-insensitive)
export function filterBooks(books, search) {
  if (!search.trim()) return books;
  const lower = search.toLowerCase();
  return books.filter(
    (book) =>
      book.title?.toLowerCase().includes(lower) ||
      book.author?.toLowerCase().includes(lower)
  );
}
