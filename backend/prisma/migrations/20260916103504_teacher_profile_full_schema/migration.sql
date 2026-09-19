-- CreateTable
CREATE TABLE `teacher_profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` JSON NOT NULL,
    `title` JSON NOT NULL,
    `photo` VARCHAR(191) NULL,
    `tagline` JSON NOT NULL,
    `verse` JSON NOT NULL,
    `cvFile` VARCHAR(191) NULL,
    `bio` JSON NOT NULL,
    `qualifications` JSON NOT NULL,
    `experienceYears` INTEGER NOT NULL,
    `ageGroups` JSON NOT NULL,
    `languages` JSON NOT NULL,
    `teachingStyle` JSON NOT NULL,
    `online` BOOLEAN NOT NULL DEFAULT true,
    `statsStudents` INTEGER NOT NULL DEFAULT 0,
    `statsSurahsTaught` INTEGER NOT NULL DEFAULT 0,
    `statsTeachingHours` INTEGER NOT NULL DEFAULT 0,
    `contactWhatsappNumber` VARCHAR(191) NULL,
    `contactWhatsappLink` VARCHAR(191) NULL,
    `contactEmail` VARCHAR(191) NULL,
    `contactTelegram` VARCHAR(191) NULL,
    `contactFacebook` VARCHAR(191) NULL,
    `contactLinkedin` VARCHAR(191) NULL,
    `whatsappMessage` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `specialties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacherProfileId` INTEGER NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `ar` VARCHAR(191) NOT NULL,
    `en` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certificates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacherProfileId` INTEGER NOT NULL,
    `title` JSON NOT NULL,
    `issuer` JSON NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `type` JSON NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experiences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacherProfileId` INTEGER NOT NULL,
    `place` JSON NOT NULL,
    `role` JSON NOT NULL,
    `period` JSON NOT NULL,
    `tasks` JSON NOT NULL,
    `students` INTEGER NOT NULL,
    `mode` JSON NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `methodologies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacherProfileId` INTEGER NOT NULL,
    `ar` VARCHAR(191) NOT NULL,
    `en` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testimonials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacherProfileId` INTEGER NOT NULL,
    `name` JSON NOT NULL,
    `country` JSON NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `text` JSON NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacherProfileId` INTEGER NOT NULL,
    `ar` VARCHAR(191) NOT NULL,
    `en` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `language_skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacherProfileId` INTEGER NOT NULL,
    `lang` JSON NOT NULL,
    `level` JSON NOT NULL,
    `percent` INTEGER NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacherProfileId` INTEGER NOT NULL,
    `ar` VARCHAR(191) NOT NULL,
    `en` VARCHAR(191) NOT NULL,
    `percent` INTEGER NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentName` VARCHAR(191) NOT NULL,
    `contactInfo` VARCHAR(191) NOT NULL,
    `requestedTime` DATETIME(3) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `specialties` ADD CONSTRAINT `specialties_teacherProfileId_fkey` FOREIGN KEY (`teacherProfileId`) REFERENCES `teacher_profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certificates` ADD CONSTRAINT `certificates_teacherProfileId_fkey` FOREIGN KEY (`teacherProfileId`) REFERENCES `teacher_profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experiences` ADD CONSTRAINT `experiences_teacherProfileId_fkey` FOREIGN KEY (`teacherProfileId`) REFERENCES `teacher_profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `methodologies` ADD CONSTRAINT `methodologies_teacherProfileId_fkey` FOREIGN KEY (`teacherProfileId`) REFERENCES `teacher_profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testimonials` ADD CONSTRAINT `testimonials_teacherProfileId_fkey` FOREIGN KEY (`teacherProfileId`) REFERENCES `teacher_profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `countries` ADD CONSTRAINT `countries_teacherProfileId_fkey` FOREIGN KEY (`teacherProfileId`) REFERENCES `teacher_profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `language_skills` ADD CONSTRAINT `language_skills_teacherProfileId_fkey` FOREIGN KEY (`teacherProfileId`) REFERENCES `teacher_profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skills` ADD CONSTRAINT `skills_teacherProfileId_fkey` FOREIGN KEY (`teacherProfileId`) REFERENCES `teacher_profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
