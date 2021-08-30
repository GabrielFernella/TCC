import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatedEntities1630324822800 implements MigrationInterface {
    name = 'CreatedEntities1630324822800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pagamento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "statusPagamento" integer NOT NULL, "title" character varying NOT NULL, "emailPagador" character varying NOT NULL, "valor" numeric NOT NULL, "pixDestinatario" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "aluno_id" uuid NOT NULL, CONSTRAINT "PK_ac81e75b741a26f350c5fb1ff20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aluno_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "aluno_id" uuid NOT NULL, CONSTRAINT "PK_0abbe5976318ee4629b18f9dbd1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aluno" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying NOT NULL, "pix" character varying NOT NULL, "key" character varying DEFAULT '', "bloqueio" boolean DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9611d4cf7a77574063439cf46b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "disponibilidade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "diaSemana" integer NOT NULL, "horarioEntrada" integer NOT NULL, "horarioSaida" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "professor_id" uuid NOT NULL, CONSTRAINT "PK_2c0cb4e3d1de771c23c19eab2d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "disciplina" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying NOT NULL, "tag" text NOT NULL, "descricao" text NOT NULL, "valor" numeric NOT NULL, "qtdAvaliacao" integer NOT NULL, "mediaAvaliacao" integer NOT NULL, "ativado" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP, "professor_id" uuid NOT NULL, CONSTRAINT "PK_02bd5fd4e075740beb27bcdcddf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "professor_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "professor_id" uuid NOT NULL, CONSTRAINT "REL_61d62ccc776a1858bb7f590fe7" UNIQUE ("professor_id"), CONSTRAINT "PK_a265b0ff919e131ff539250462d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "professor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying NOT NULL, "pix" character varying NOT NULL, "key" character varying DEFAULT '', "bloqueio" boolean DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "biografia" text NOT NULL, CONSTRAINT "PK_39a6c8f16280dc3bc3ffdc41e02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agendamento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" TIMESTAMP NOT NULL, "entrada" integer NOT NULL, "saida" integer NOT NULL, "link" character varying NOT NULL, "status" integer NOT NULL, "nota" character varying NOT NULL, "opiniao" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "aluno_id" uuid NOT NULL, "pagamento_id" uuid NOT NULL, "disciplina_id" uuid NOT NULL, "professor_id" uuid NOT NULL, CONSTRAINT "REL_afbfde78d726fc78a9c177c950" UNIQUE ("pagamento_id"), CONSTRAINT "PK_a102b15cfec9ce6d8ac6193345f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pagamento" ADD CONSTRAINT "FK_40a6e7056b5da6824f02e354b3f" FOREIGN KEY ("aluno_id") REFERENCES "aluno"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aluno_token" ADD CONSTRAINT "FK_04a119c3528335b35db40c0fc2c" FOREIGN KEY ("aluno_id") REFERENCES "aluno"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "disponibilidade" ADD CONSTRAINT "FK_96cf1b0e9f75ceddd30064dc38a" FOREIGN KEY ("professor_id") REFERENCES "professor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "disciplina" ADD CONSTRAINT "FK_c69a8c7446b0fd039dcacbf1bb4" FOREIGN KEY ("professor_id") REFERENCES "professor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professor_token" ADD CONSTRAINT "FK_61d62ccc776a1858bb7f590fe74" FOREIGN KEY ("professor_id") REFERENCES "professor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agendamento" ADD CONSTRAINT "FK_84b98c0e9d202de647850568b86" FOREIGN KEY ("aluno_id") REFERENCES "aluno"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agendamento" ADD CONSTRAINT "FK_afbfde78d726fc78a9c177c9504" FOREIGN KEY ("pagamento_id") REFERENCES "pagamento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agendamento" ADD CONSTRAINT "FK_19427b7160b8fd87a80c1c48bbf" FOREIGN KEY ("disciplina_id") REFERENCES "disciplina"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agendamento" ADD CONSTRAINT "FK_bbe8783e2082e40416f602af0ae" FOREIGN KEY ("professor_id") REFERENCES "professor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" DROP CONSTRAINT "FK_bbe8783e2082e40416f602af0ae"`);
        await queryRunner.query(`ALTER TABLE "agendamento" DROP CONSTRAINT "FK_19427b7160b8fd87a80c1c48bbf"`);
        await queryRunner.query(`ALTER TABLE "agendamento" DROP CONSTRAINT "FK_afbfde78d726fc78a9c177c9504"`);
        await queryRunner.query(`ALTER TABLE "agendamento" DROP CONSTRAINT "FK_84b98c0e9d202de647850568b86"`);
        await queryRunner.query(`ALTER TABLE "professor_token" DROP CONSTRAINT "FK_61d62ccc776a1858bb7f590fe74"`);
        await queryRunner.query(`ALTER TABLE "disciplina" DROP CONSTRAINT "FK_c69a8c7446b0fd039dcacbf1bb4"`);
        await queryRunner.query(`ALTER TABLE "disponibilidade" DROP CONSTRAINT "FK_96cf1b0e9f75ceddd30064dc38a"`);
        await queryRunner.query(`ALTER TABLE "aluno_token" DROP CONSTRAINT "FK_04a119c3528335b35db40c0fc2c"`);
        await queryRunner.query(`ALTER TABLE "pagamento" DROP CONSTRAINT "FK_40a6e7056b5da6824f02e354b3f"`);
        await queryRunner.query(`DROP TABLE "agendamento"`);
        await queryRunner.query(`DROP TABLE "professor"`);
        await queryRunner.query(`DROP TABLE "professor_token"`);
        await queryRunner.query(`DROP TABLE "disciplina"`);
        await queryRunner.query(`DROP TABLE "disponibilidade"`);
        await queryRunner.query(`DROP TABLE "aluno"`);
        await queryRunner.query(`DROP TABLE "aluno_token"`);
        await queryRunner.query(`DROP TABLE "pagamento"`);
    }

}
