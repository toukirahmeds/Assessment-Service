import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1600684430546 implements MigrationInterface {
    name = 'CreateTables1600684430546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `choice` (`id` varchar(36) NOT NULL, `choice` varchar(255) NOT NULL, `questionId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `nested_question` (`id` varchar(36) NOT NULL, `nestedQuestionTriggerFor` varchar(255) NULL, `question` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `question` (`id` varchar(36) NOT NULL, `question` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, `nestedQuestionId` varchar(36) NULL, UNIQUE INDEX `REL_e0c4d398613840e59f5e5f6be3` (`nestedQuestionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `assessment` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `assessmentId` varchar(255) NOT NULL, UNIQUE INDEX `IDX_ee59334f5aeb74f6ae75aaf512` (`assessmentId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `question_response` (`id` varchar(36) NOT NULL, `assessmentId` varchar(255) NOT NULL, `answer` varchar(255) NOT NULL, `nestedAnswer` varchar(255) NULL, `questionId` varchar(36) NULL, `assessmentResponseId` varchar(36) NULL, UNIQUE INDEX `REL_91f0c1f6c501e01525c9db6df2` (`questionId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `assessment_response` (`id` varchar(36) NOT NULL, `assessorId` varchar(255) NOT NULL, `assessmentId` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `assessment_questions_question` (`assessmentId` varchar(36) NOT NULL, `questionId` varchar(36) NOT NULL, INDEX `IDX_3b77bb517fe9fc1db4d8f428a9` (`assessmentId`), INDEX `IDX_d35a82dd94a1a1c2af664ad472` (`questionId`), PRIMARY KEY (`assessmentId`, `questionId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `choice` ADD CONSTRAINT `FK_5cc8f4862acc8b7b956be1be204` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_e0c4d398613840e59f5e5f6be34` FOREIGN KEY (`nestedQuestionId`) REFERENCES `nested_question`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `question_response` ADD CONSTRAINT `FK_91f0c1f6c501e01525c9db6df29` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `question_response` ADD CONSTRAINT `FK_a12e576f941720c8dc98926cc80` FOREIGN KEY (`assessmentResponseId`) REFERENCES `assessment_response`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `assessment_questions_question` ADD CONSTRAINT `FK_3b77bb517fe9fc1db4d8f428a94` FOREIGN KEY (`assessmentId`) REFERENCES `assessment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `assessment_questions_question` ADD CONSTRAINT `FK_d35a82dd94a1a1c2af664ad4727` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `assessment_questions_question` DROP FOREIGN KEY `FK_d35a82dd94a1a1c2af664ad4727`");
        await queryRunner.query("ALTER TABLE `assessment_questions_question` DROP FOREIGN KEY `FK_3b77bb517fe9fc1db4d8f428a94`");
        await queryRunner.query("ALTER TABLE `question_response` DROP FOREIGN KEY `FK_a12e576f941720c8dc98926cc80`");
        await queryRunner.query("ALTER TABLE `question_response` DROP FOREIGN KEY `FK_91f0c1f6c501e01525c9db6df29`");
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_e0c4d398613840e59f5e5f6be34`");
        await queryRunner.query("ALTER TABLE `choice` DROP FOREIGN KEY `FK_5cc8f4862acc8b7b956be1be204`");
        await queryRunner.query("DROP INDEX `IDX_d35a82dd94a1a1c2af664ad472` ON `assessment_questions_question`");
        await queryRunner.query("DROP INDEX `IDX_3b77bb517fe9fc1db4d8f428a9` ON `assessment_questions_question`");
        await queryRunner.query("DROP TABLE `assessment_questions_question`");
        await queryRunner.query("DROP TABLE `assessment_response`");
        await queryRunner.query("DROP INDEX `REL_91f0c1f6c501e01525c9db6df2` ON `question_response`");
        await queryRunner.query("DROP TABLE `question_response`");
        await queryRunner.query("DROP INDEX `IDX_ee59334f5aeb74f6ae75aaf512` ON `assessment`");
        await queryRunner.query("DROP TABLE `assessment`");
        await queryRunner.query("DROP INDEX `REL_e0c4d398613840e59f5e5f6be3` ON `question`");
        await queryRunner.query("DROP TABLE `question`");
        await queryRunner.query("DROP TABLE `nested_question`");
        await queryRunner.query("DROP TABLE `choice`");
    }

}
