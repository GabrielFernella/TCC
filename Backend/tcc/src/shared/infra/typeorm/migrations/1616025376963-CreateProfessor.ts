import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProfessor1616025376963
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'professor',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'senha',
            type: 'varchar',
          },
          {
            name: 'avatar',
            type: 'varchar',
          },
          {
            name: 'pix',
            type: 'varchar',
          },
          {
            name: 'bloqueio',
            type: 'boolean',
          },
          {
            name: 'bio',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('professor');
  }
}

/*
- ID: UUID
- name: String
- cpf: String
- email: String
- senha: String
- avatar: String
- pix: String
- bloqueio: boolean
- bio: String
*/
