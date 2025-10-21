import stringMask from './stringMask';

interface IHideString {
  pattern?: string;
  placeholder?: string;
  show?: {
    end: number;
    start: number;
  };
  value: string;
}

const hideString = ({
  pattern = '+998 ## ### ## ##',
  placeholder = '*',
  show = { end: 2, start: 3 },
  value
}: IHideString) => {
  if (!value) {
    return '';
  }

  value = value.replace(/ /g, '');

  const valueLength = value.length;
  const start = value.substring(0, show.start);
  const end = value.substring(valueLength - show.end, valueLength);

  const placeholders = placeholder.repeat(valueLength - show.start - show.end);

  return stringMask(`${start}${placeholders}${end}`, pattern);
};

export default hideString;
