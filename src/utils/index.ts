export function withCommas(x?: string | number) {
  if(!x) return '';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}