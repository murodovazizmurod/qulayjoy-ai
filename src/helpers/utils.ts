export const isTechnicalBreakPeriod = (): boolean => {
  const startDate = '2025-03-20T18:00:00';
  const endDate = '2025-03-24T09:00:00';

  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  return now >= start && now <= end;
};
