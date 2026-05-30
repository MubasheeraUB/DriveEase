-- CreateTable
CREATE TABLE "TrainingSchedule" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "trainingDate" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "sessionType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrainingSchedule" ADD CONSTRAINT "TrainingSchedule_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSchedule" ADD CONSTRAINT "TrainingSchedule_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSchedule" ADD CONSTRAINT "TrainingSchedule_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
