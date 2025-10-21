export default function isDependantQueryFetching(queries: any): boolean {
  if (!Array.isArray(queries)) {
    queries = [queries];
  }

  return queries.some((q: any) => {
    return !q.isFetched && q.fetchStatus === 'fetching';
  });
}
