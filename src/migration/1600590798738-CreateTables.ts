import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1600590798738 implements MigrationInterface {
    name = 'CreateTables1600590798738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `question` (`id` varchar(36) NOT NULL, `question` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, `nestedQuestion` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `choice` (`id` varchar(36) NOT NULL, `choice` varchar(255) NOT NULL, `questionId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `choice` ADD CONSTRAINT `FK_5cc8f4862acc8b7b956be1be204` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `choice` DROP FOREIGN KEY `FK_5cc8f4862acc8b7b956be1be204`");
        await queryRunner.query("DROP TABLE `choice`");
        await queryRunner.query("DROP TABLE `question`");
    }

}
