import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Aluno } from "./Aluno";
import { Pagamento } from "./Pagamento";

@Entity("cartao", { schema: "public" })
export class Cartao {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "numeroCartao" })
  numeroCartao: string;

  @Column("character varying", { name: "dataVencimento" })
  dataVencimento: string;

  @Column("character varying", { name: "bandeira" })
  bandeira: string;

  @Column("character varying", { name: "nomeTitular" })
  nomeTitular: string;

  @Column("character varying", { name: "cvv" })
  cvv: string;

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

  @ManyToOne(() => Aluno, (aluno) => aluno.cartaos, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "aluno_id", referencedColumnName: "id" }])
  aluno: Aluno;

  @OneToMany(() => Pagamento, (pagamento) => pagamento.cartao)
  pagamentos: Pagamento[];
}
