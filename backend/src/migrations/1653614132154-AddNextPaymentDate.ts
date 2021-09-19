import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNextPaymentDate1614617733373 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE loan SET status = 'pending'`);
    await queryRunner.addColumn(
      "loan",
      new TableColumn({
        name: "nextPayment",
        type: "date",
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("loan", "nextPayment");
  }
}
