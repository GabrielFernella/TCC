import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Aluno } from "./Aluno";

@Entity("aluno_token", { schema: "public" })
export class AlunoToken {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("uuid", { name: "token", default: () => "uuid_generate_v4()" })
  token: string;

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

  @ManyToOne(() => Aluno, (aluno) => aluno.alunoTokens, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "aluno_id", referencedColumnName: "id" }])
  aluno: Aluno;
}
