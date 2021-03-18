import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAula1616025460093 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'aula',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'professor_id',
            type: 'uuid',
          },
          {
            name: 'titulo',
            type: 'varchar',
          },
          {
            name: 'tag',
            type: 'varchar',
          },
          {
            name: 'descricao',
            type: 'varchar',
          },
          {
            name: 'valor',
            type: 'decimal',
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

    // Chave estrangeira
    await queryRunner.createForeignKey(
      'aula',
      new TableForeignKey({
        name: 'ProfessorAvaliacao',
        columnNames: ['professor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'professor',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('aula');
  }
}

/*
- ID: UUID
- Teacher_ID:UUID
- Title: Time
- Tag: IList<string>
- Description: Time
- Value: Decimal
*/
