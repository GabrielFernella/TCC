import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateCreditCard1615837123779
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'creditcard',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'student_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'cardnumber',
            type: 'varchar',
          },
          {
            name: 'datevencimento',
            type: 'varchar',
          },
          {
            name: 'bandeira',
            type: 'varchar',
          },
          {
            name: 'nametitular',
            type: 'varchar',
          },
          {
            name: 'cvv',
            type: 'integer',
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
      'creditcard',
      new TableForeignKey({
        name: 'CreditCardAluno',
        columnNames: ['student_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'students',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('creditcard');
  }
}
