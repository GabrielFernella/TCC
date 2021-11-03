import {MigrationInterface, QueryRunner} from "typeorm";

export class corrigindoCHat1635909116660 implements MigrationInterface {
    name = 'corrigindoCHat1635909116660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" ADD "agendamentoId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_b7eb0f568d404f0561b89afffaf" FOREIGN KEY ("agendamentoId") REFERENCES "agendamento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_b7eb0f568d404f0561b89afffaf"`);
        await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "agendamentoId"`);
    }

}
