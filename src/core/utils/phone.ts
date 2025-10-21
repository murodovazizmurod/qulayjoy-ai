export default {
  receive: (value: string): string => (value && value.length >= 3 ? value.slice(3) : ''),
  send: (value: string): string => (value ? `998${value}` : '')
};
