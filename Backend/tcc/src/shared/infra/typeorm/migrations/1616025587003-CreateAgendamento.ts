import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAgendamento1616025587003
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'agendamento',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'aluno_id',
            type: 'uuid',
          },
          {
            name: 'professor_id',
            type: 'uuid',
          },
          {
            name: 'aula_id',
            type: 'uuid',
          },
          {
            name: 'pagamento_id',
            type: 'uuid',
          },
          {
            name: 'data',
            type: 'varchar',
          },
          {
            name: 'link',
            type: 'varchar',
          },
          {
            name: 'Nota',
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
      'agendamento',
      new TableForeignKey({
        name: 'alunoAgendamento',
        columnNames: ['aluno_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'aluno',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'agendamento',
      new TableForeignKey({
        name: 'professorAgendamento',
        columnNames: ['professor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'professor',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'agendamento',
      new TableForeignKey({
        name: 'AulaAgendamento',
        columnNames: ['aula_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'aula',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'agendamento',
      new TableForeignKey({
        name: 'pagamentoAgendamento',
        columnNames: ['pagamento_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pagamento',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('agendamento');
  }
}

/*
- ID: UUID
- Aluno: Aluno
- Professor: Professor
- Aula:Aula
- Pagamento: Pagamento
- Data: Date
- Link: String
- Nota: int
*/
