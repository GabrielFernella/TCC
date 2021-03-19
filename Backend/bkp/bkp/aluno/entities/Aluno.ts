import { Entity, OneToOne } from 'typeorm';

import Usuario from '@modules/usuario/infra/typeorm/entities/usuario';
import CreditCard from './CreditCard';

// importando a classe usuário que já possui os atributos semelhantes

@Entity('aluno')
class Aluno extends Usuario {
  @OneToOne(type => CreditCard, aluno => Aluno)
  creditcard: CreditCard;
}

export default Aluno;
