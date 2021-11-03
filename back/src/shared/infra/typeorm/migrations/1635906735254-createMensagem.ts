import {MigrationInterface, QueryRunner} from "typeorm";

export class createMensagem1635906735254 implements MigrationInterface {
    name = 'createMensagem1635906735254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mensagens" ADD "mensagem" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mensagens" ADD "isAluno" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mensagens" DROP COLUMN "isAluno"`);
        await queryRunner.query(`ALTER TABLE "mensagens" DROP COLUMN "mensagem"`);
    }

}
