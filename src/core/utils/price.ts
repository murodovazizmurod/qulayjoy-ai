export default {
  receive: (value: number): number => (Number(value) ? Number((value / 100).toFixed(2)) : 0),
  send: (value: number): number => (Number(value) ? Number(value) * 100 : 0)
};
