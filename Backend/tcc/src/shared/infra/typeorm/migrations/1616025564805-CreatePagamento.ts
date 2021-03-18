import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePagamento1616025564805
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pagamento',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'cartao_id',
            type: 'uuid',
          },
          {
            name: 'valor',
            type: 'varchar',
          },
          {
            name: 'estatus',
            type: 'varchar',
          },
          {
            name: 'comprovante',
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
      'pagamento',
      new TableForeignKey({
        name: 'PagamentoCartao',
        columnNames: ['cartao_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cartao',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pagamento');
  }
}

/*

//Pode ser alterada

-  Id: UUID
- Agendamento: Agendamento
- CreditCard: CreditCard
- Valor: Money
- Comprovante: string
*/
