import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAvaliacao1616025447960
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'avaliacao',
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
            name: 'qtdAulas',
            type: 'integer',
          },
          {
            name: 'mediaAvaliacao',
            type: 'float',
          },
          {
            name: 'oponiao',
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

    // Chave estrangeira
    await queryRunner.createForeignKey(
      'avaliacao',
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
    await queryRunner.dropTable('avaliacao');
  }
}

/**
- ID: UUID
- Teacher_ID:UUID
- QtdAulas: int
- MediaAvaliacao: Double
- Opinion: ILinst<String>
 */
