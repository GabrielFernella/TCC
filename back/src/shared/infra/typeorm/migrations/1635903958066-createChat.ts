import {MigrationInterface, QueryRunner} from "typeorm";

export class createChat1635903958066 implements MigrationInterface {
    name = 'createChat1635903958066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "alunoId" uuid NOT NULL, "professorId" uuid NOT NULL, CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mensagens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dataMensagem" TIMESTAMP NOT NULL DEFAULT now(), "chatId" uuid NOT NULL, CONSTRAINT "PK_c2ba5218f1bff3363548479d2f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_ab9ee037e8cb2784fbbd81de2b5" FOREIGN KEY ("alunoId") REFERENCES "aluno"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_9713803b2cdd3d8bb989a1aa2dd" FOREIGN KEY ("professorId") REFERENCES "professor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mensagens" ADD CONSTRAINT "FK_e7926e9ef8b228226117b47264c" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mensagens" DROP CONSTRAINT "FK_e7926e9ef8b228226117b47264c"`);
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_9713803b2cdd3d8bb989a1aa2dd"`);
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_ab9ee037e8cb2784fbbd81de2b5"`);
        await queryRunner.query(`DROP TABLE "mensagens"`);
        await queryRunner.query(`DROP TABLE "chats"`);
    }

}
