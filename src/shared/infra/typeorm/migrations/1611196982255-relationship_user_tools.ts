import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class relationshipUserTools1611196982255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'tools',
      new TableForeignKey({
        name: 'tools_to_user',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tools', 'tools_to_user')
  }
}
