import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Agendamento } from "./Agendamento";
import { Professor } from "./Professor";

@Entity("aula", { schema: "public" })
export class Aula {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "titulo" })
  titulo: string;

  @Column("character varying", { name: "tag" })
  tag: string;

  @Column("character varying", { name: "descricao" })
  descricao: string;

  @Column("numeric", { name: "valor" })
  valor: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.aula)
  agendamentos: Agendamento[];

  @ManyToOne(() => Professor, (professor) => professor.aulas, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "professor_id", referencedColumnName: "id" }])
  professor: Professor;
}
