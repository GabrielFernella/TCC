import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAvaliacao1614980433207
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
            name: 'teacher_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'qtdaulas',
            type: 'integer',
          },
          {
            name: 'qtdavaliacao',
            type: 'integer',
          },
          {
            name: 'opinion',
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

    await queryRunner.createForeignKey(
      'avaliacao',
      new TableForeignKey({
        name: 'TeacherAvaliacao',
        columnNames: ['teacher_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teachers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('avaliacao');
  }
}
