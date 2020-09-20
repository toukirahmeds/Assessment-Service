import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1600604987127 implements MigrationInterface {
    name = 'CreateTables1600604987127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `nested_question` (`id` varchar(36) NOT NULL, `question` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `question` (`id` varchar(36) NOT NULL, `question` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, `nestedQuestionId` varchar(36) NULL, UNIQUE INDEX `REL_e0c4d398613840e59f5e5f6be3` (`nestedQuestionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `choice` (`id` varchar(36) NOT NULL, `choice` varchar(255) NOT NULL, `questionId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_e0c4d398613840e59f5e5f6be34` FOREIGN KEY (`nestedQuestionId`) REFERENCES `nested_question`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `choice` ADD CONSTRAINT `FK_5cc8f4862acc8b7b956be1be204` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `choice` DROP FOREIGN KEY `FK_5cc8f4862acc8b7b956be1be204`");
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_e0c4d398613840e59f5e5f6be34`");
        await queryRunner.query("DROP TABLE `choice`");
        await queryRunner.query("DROP INDEX `REL_e0c4d398613840e59f5e5f6be3` ON `question`");
        await queryRunner.query("DROP TABLE `question`");
        await queryRunner.query("DROP TABLE `nested_question`");
    }

}
