import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import Agendamento from '@modules/agendamento/infra/typeorm/entities/Agendamento';
import Usuario from '@modules/usuario/infra/typeorm/entities/usuario';
import Disponibilidade from './Disponibilidade';
import Disciplina from './Disciplina';
import ProfessorToken from './ProfessorToken';

@Entity('professor')
class Professor extends Usuario {
  @Column()
  bio: string;

  @OneToMany(() => Agendamento, professor => Professor)
  agendamentos: Agendamento[];

  @OneToMany(() => Disciplina, professor => Professor)
  disciplina: Disciplina[];

  @OneToMany(() => Disponibilidade, professor => Professor)
  disponibilidades: Disponibilidade[];

  @OneToOne(() => ProfessorToken, professor => Professor)
  professorToken: ProfessorToken;
}

export default Professor;
