-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Computer" (
    "id" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "ip" TEXT NOT NULL,
    "mac" TEXT NOT NULL,
    "roomId" TEXT,

    CONSTRAINT "Computer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Computer" ADD CONSTRAINT "Computer_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
