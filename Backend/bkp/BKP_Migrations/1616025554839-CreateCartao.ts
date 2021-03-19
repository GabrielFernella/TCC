import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateCartao1616025554839 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cartao',
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
            name: 'numeroCartao',
            type: 'varchar',
          },
          {
            name: 'dataVencimento',
            type: 'varchar',
          },
          {
            name: 'bandeira',
            type: 'varchar',
          },
          {
            name: 'nomeTitular',
            type: 'varchar',
          },
          {
            name: 'cvv',
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
      'cartao',
      new TableForeignKey({
        name: 'AlunoCartao',
        columnNames: ['aluno_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'aluno',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cartao');
  }
}

/*
- aluno_id: UUID
- numeroCartao: String
- dataVencimento:String
- bandeira:String
- nomeTitular: String
- cvv: integer
*/
