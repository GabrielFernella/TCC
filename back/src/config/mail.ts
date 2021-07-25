interface IMailConfig {
  // driver: 'ethereal' | 'ses';

  driver: 'ethereal';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'seu@email.com',
      name: 'Seu Nome',
    },
  },
} as IMailConfig;

/*
export default {
  host: 'smtp.gmail.com',
  port: 587,
  user: 'gmail.com',
  pass: '',
};
*/
