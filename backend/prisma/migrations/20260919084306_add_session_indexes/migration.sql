-- CreateIndex
CREATE INDEX `sessions_status_idx` ON `sessions`(`status`);

-- RedefineIndex
CREATE INDEX `sessions_userId_idx` ON `sessions`(`userId`);
