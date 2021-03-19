import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Professor } from "./Professor";

@Entity("disponibilidade", { schema: "public" })
export class Disponibilidade {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "diaSemana" })
  diaSemana: string;

  @Column("character varying", { name: "horarioEntrada" })
  horarioEntrada: string;

  @Column("character varying", { name: "horarioSaida" })
  horarioSaida: string;

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

  @ManyToOne(() => Professor, (professor) => professor.disponibilidades, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "professor_id", referencedColumnName: "id" }])
  professor: Professor;
}
