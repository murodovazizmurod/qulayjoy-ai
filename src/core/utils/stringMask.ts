import { get } from 'radash';

const stringMask = (value: any, pattern: any, defaultValue = '') => {
  if (!pattern || !pattern.length) {
    return value;
  }

  if (!value) {
    return '';
  }

  if (value.length !== pattern.match(/#/g).length) {
    return value;
  }

  let i = 0;

  const v = value.toString();

  return pattern.replace(/#/g, () => get(v, `[${i++}]`, defaultValue));
};

export default stringMask;
