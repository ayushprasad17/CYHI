export function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function initials(name) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}

const pillMap = {
  Urgent: 'pill-red', High: 'pill-amber', Medium: 'pill-blue', Low: 'pill-neutral',
  Published: 'pill-green', Draft: 'pill-neutral',
  Active: 'pill-green', Inactive: 'pill-red',
  Upcoming: 'pill-blue', Open: 'pill-green', Closed: 'pill-neutral', Completed: 'pill-neutral',
};

export function pillClass(value) {
  return pillMap[value] || 'pill-neutral';
}

export function uniq(arr) {
  return [...new Set(arr)];
}
