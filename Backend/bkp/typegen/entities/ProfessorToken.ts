import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Professor } from "./Professor";

@Entity("professor_token", { schema: "public" })
export class ProfessorToken {
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

  @ManyToOne(() => Professor, (professor) => professor.professorTokens, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "professor_id", referencedColumnName: "id" }])
  professor: Professor;
}
