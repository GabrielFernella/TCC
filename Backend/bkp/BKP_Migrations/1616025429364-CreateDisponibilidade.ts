import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateDisponibilidade1616025429364
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'disponibilidade',
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
            name: 'diaSemana',
            type: 'varchar',
          },
          {
            name: 'horarioEntrada',
            type: 'varchar',
          },
          {
            name: 'horarioSaida',
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
      'disponibilidade',
      new TableForeignKey({
        name: 'ProfessorDisponibilidade',
        columnNames: ['professor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'professor',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('disponibilidade');
  }
}

/*
- ID: UUID
- Teacher_ID:UUID
- DiaSemana: Data
- HorárioEntrada: int
- HorárioSaida: int
*/
