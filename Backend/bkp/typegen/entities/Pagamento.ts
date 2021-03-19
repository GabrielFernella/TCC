import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Agendamento } from "./Agendamento";
import { Cartao } from "./Cartao";

@Entity("pagamento", { schema: "public" })
export class Pagamento {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "valor" })
  valor: string;

  @Column("character varying", { name: "estatus" })
  estatus: string;

  @Column("character varying", { name: "comprovante" })
  comprovante: string;

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

  @OneToMany(() => Agendamento, (agendamento) => agendamento.pagamento)
  agendamentos: Agendamento[];

  @ManyToOne(() => Cartao, (cartao) => cartao.pagamentos, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "cartao_id", referencedColumnName: "id" }])
  cartao: Cartao;
}
