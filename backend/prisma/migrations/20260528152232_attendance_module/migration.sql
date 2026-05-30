-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "trainingScheduleId" INTEGER NOT NULL,
    "attendanceDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_trainingScheduleId_fkey" FOREIGN KEY ("trainingScheduleId") REFERENCES "TrainingSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
