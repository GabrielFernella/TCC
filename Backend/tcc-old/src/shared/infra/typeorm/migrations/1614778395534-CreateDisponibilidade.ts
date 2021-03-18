import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateDisponibilidade1614778395534
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'disponibilidades',
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
            name: 'diaSemana',
            type: 'varchar',
          },
          {
            name: 'horarioentrada',
            type: 'varchar',
          },
          {
            name: 'horariosaida',
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
      'disponibilidades',
      new TableForeignKey({
        name: 'TeacherDisponibilidade',
        columnNames: ['teacher_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teachers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('disponibilidade');
  }
}
