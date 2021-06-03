export function currency(e: React.FormEvent<HTMLInputElement>) {
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

  e.currentTarget.value = `R$ ${value}`;
  return e;
}

export function money(e: React.FormEvent<HTMLInputElement>) {
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  // value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

  e.currentTarget.value = `${value}`;
  return e;
}

export function number(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 15;
  let { value } = e.currentTarget;
  // eslint-disable-next-line no-useless-escape
  if (!value.match(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/)) {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    value = value.replace(/(\d{3})(\d{2})$/, '$1-$2');
    e.currentTarget.value = value;
  }
  return e;
}

export function moeda(e: React.FormEvent<HTMLInputElement>) {
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

  e.currentTarget.value = `${value}`;
  return e;
}

const filterFloat = function (value: string) {
  // eslint-disable-next-line no-useless-escape
  if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value))
    return Number(value);
  return NaN;
};
