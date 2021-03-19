import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Professor } from "./Professor";

@Entity("avaliacao", { schema: "public" })
export class Avaliacao {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("integer", { name: "qtdAulas" })
  qtdAulas: number;

  @Column("double precision", { name: "mediaAvaliacao", precision: 53 })
  mediaAvaliacao: number;

  @Column("character varying", { name: "oponiao" })
  oponiao: string;

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

  @ManyToOne(() => Professor, (professor) => professor.avaliacaos, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "professor_id", referencedColumnName: "id" }])
  professor: Professor;
}
