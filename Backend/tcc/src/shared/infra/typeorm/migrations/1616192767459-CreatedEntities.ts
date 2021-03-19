import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatedEntities1616192767459
  implements MigrationInterface {
  name = 'CreatedEntities1616192767459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pagamento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "valor" character varying NOT NULL, "estatus" character varying NOT NULL, "comprovante" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cartao_id" uuid NOT NULL, CONSTRAINT "PK_ac81e75b741a26f350c5fb1ff20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cartao" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "numeroCartao" character varying NOT NULL, "dataVencimento" character varying NOT NULL, "bandeira" character varying NOT NULL, "nomeTitular" character varying NOT NULL, "cvv" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "aluno_id" uuid NOT NULL, CONSTRAINT "PK_4e39f2f0b54a26014e575465719" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "aluno_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "professor_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0abbe5976318ee4629b18f9dbd1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "aluno" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying NOT NULL, "pix" character varying NOT NULL, "ban" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9611d4cf7a77574063439cf46b2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "disponibilidade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "diaSemana" character varying NOT NULL, "horarioEntrada" character varying NOT NULL, "horarioSaida" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "professor_id" uuid NOT NULL, CONSTRAINT "PK_2c0cb4e3d1de771c23c19eab2d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "avaliacao" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "qtdAulas" integer NOT NULL, "mediaAvaliacao" integer NOT NULL, "oponiao" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "professor_id" uuid NOT NULL, CONSTRAINT "REL_2f7469858c9871f2d6e361d24d" UNIQUE ("professor_id"), CONSTRAINT "PK_fd3e156019eb4b68c6c9f746d51" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "professor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying NOT NULL, "pix" character varying NOT NULL, "ban" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "bio" character varying NOT NULL, CONSTRAINT "PK_39a6c8f16280dc3bc3ffdc41e02" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "aula" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying NOT NULL, "tag" character varying NOT NULL, "descricao" character varying NOT NULL, "valor" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "professor_id" uuid NOT NULL, CONSTRAINT "PK_f4b5d2e277c6146e2572c6ee76a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "agendamento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" character varying NOT NULL, "link" character varying NOT NULL, "Nota" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "aluno_id" uuid NOT NULL, "pagamento_id" uuid NOT NULL, "aula_id" uuid NOT NULL, "professor_id" uuid NOT NULL, CONSTRAINT "PK_a102b15cfec9ce6d8ac6193345f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "professor_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "professor_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a265b0ff919e131ff539250462d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pagamento" ADD CONSTRAINT "FK_bc355b3e472ed39956442f36319" FOREIGN KEY ("cartao_id") REFERENCES "cartao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cartao" ADD CONSTRAINT "FK_572ff0ceffea0184db2323b67fa" FOREIGN KEY ("aluno_id") REFERENCES "aluno"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "disponibilidade" ADD CONSTRAINT "FK_96cf1b0e9f75ceddd30064dc38a" FOREIGN KEY ("professor_id") REFERENCES "professor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "avaliacao" ADD CONSTRAINT "FK_2f7469858c9871f2d6e361d24dc" FOREIGN KEY ("professor_id") REFERENCES "professor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "aula" ADD CONSTRAINT "FK_4ea35e6d4fe8cf54a4c1d04638b" FOREIGN KEY ("professor_id") REFERENCES "professor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "agendamento" ADD CONSTRAINT "FK_84b98c0e9d202de647850568b86" FOREIGN KEY ("aluno_id") REFERENCES "aluno"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "agendamento" ADD CONSTRAINT "FK_afbfde78d726fc78a9c177c9504" FOREIGN KEY ("pagamento_id") REFERENCES "pagamento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "agendamento" ADD CONSTRAINT "FK_10fdf4c99f68346529509fcdbee" FOREIGN KEY ("aula_id") REFERENCES "aula"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "agendamento" ADD CONSTRAINT "FK_bbe8783e2082e40416f602af0ae" FOREIGN KEY ("professor_id") REFERENCES "professor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "agendamento" DROP CONSTRAINT "FK_bbe8783e2082e40416f602af0ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "agendamento" DROP CONSTRAINT "FK_10fdf4c99f68346529509fcdbee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "agendamento" DROP CONSTRAINT "FK_afbfde78d726fc78a9c177c9504"`,
    );
    await queryRunner.query(
      `ALTER TABLE "agendamento" DROP CONSTRAINT "FK_84b98c0e9d202de647850568b86"`,
    );
    await queryRunner.query(
      `ALTER TABLE "aula" DROP CONSTRAINT "FK_4ea35e6d4fe8cf54a4c1d04638b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "avaliacao" DROP CONSTRAINT "FK_2f7469858c9871f2d6e361d24dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "disponibilidade" DROP CONSTRAINT "FK_96cf1b0e9f75ceddd30064dc38a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cartao" DROP CONSTRAINT "FK_572ff0ceffea0184db2323b67fa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pagamento" DROP CONSTRAINT "FK_bc355b3e472ed39956442f36319"`,
    );
    await queryRunner.query(`DROP TABLE "professor_token"`);
    await queryRunner.query(`DROP TABLE "agendamento"`);
    await queryRunner.query(`DROP TABLE "aula"`);
    await queryRunner.query(`DROP TABLE "professor"`);
    await queryRunner.query(`DROP TABLE "avaliacao"`);
    await queryRunner.query(`DROP TABLE "disponibilidade"`);
    await queryRunner.query(`DROP TABLE "aluno"`);
    await queryRunner.query(`DROP TABLE "aluno_token"`);
    await queryRunner.query(`DROP TABLE "cartao"`);
    await queryRunner.query(`DROP TABLE "pagamento"`);
  }
}
