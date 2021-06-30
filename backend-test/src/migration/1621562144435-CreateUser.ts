import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1621562144435 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "users",
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
            },
            {
              name: "display_name",
              type: "text"
            },
            {
              name: "email",
              type: "text"
            },
            {
              name: "password",
              type: "text"
            },
            {
              name: "image",
              type: "text"
            },
          ],
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users");
    }

}
