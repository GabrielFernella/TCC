import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import Agendamento from '@modules/agendamento/infra/typeorm/entities/Agendamento';
import Usuario from '@modules/usuario/infra/typeorm/entities/Usuario';
import Pagamento from './Pagamento';
import AlunoToken from './AlunoToken';

@Entity('aluno')
class Aluno extends Usuario {
  @Column()
  bloqueio: boolean = false;


  //TODO -> Refatorar para ficar no Usuário
  @OneToMany(() => Agendamento, aluno => Aluno)
  agendamentos: Agendamento[];

  @OneToOne(() => AlunoToken, aluno => Aluno)
  alunoTokens: AlunoToken;

  @OneToMany(() => Pagamento, aluno => Aluno)
  pagamento: Pagamento;
}

export default Aluno;
