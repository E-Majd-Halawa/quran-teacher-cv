-- AlterTable
ALTER TABLE `sessions` ADD COLUMN `adminReply` TEXT NULL,
    ADD COLUMN `adminReplyAt` DATETIME(3) NULL,
    ADD COLUMN `replySeenAt` DATETIME(3) NULL;
