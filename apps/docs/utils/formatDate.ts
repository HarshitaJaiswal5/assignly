export const formatDeliveryDate = (date: string) => {
  if (!date) return 'Date not specified';

  const datePart = date.split('T')[0];

  if (!datePart) return 'Date not specified';

  const [year, month, day] = datePart.split('-').map(Number);

  if (!year || !month || !day) return 'Date not specified';

  const monthName = new Date(year, month - 1, day).toLocaleString('en-US', {
    month: 'short',
  });

  return `${monthName} ${day}`;
};