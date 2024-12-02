import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roomData = [
    { name: 'HD3', capacity: 21 },
    { name: 'HD4', capacity: 21 },
  ];

  const rooms = await Promise.all(
    roomData.map((room) => prisma.room.create({ data: room })),
  );

  await prisma.computer.createMany({
    data: [
      {
        roomId: rooms[0].id,
        number: 1,
        mac: '38-22-E2-1E-20-02',
        ip: '10.21.45.186',
        hostname: 'PC202010000063-COMP10',
      },
      {
        roomId: rooms[0].id,
        number: 2,
        mac: 'A8-B1-3B-74-13-B0',
        ip: '10.21.45.187',
        hostname: 'PC8CC2081NP3',
      },
      {
        roomId: rooms[0].id,
        number: 3,
        mac: 'A8-B1-3B-74-82-E2',
        ip: '10.21.45.188',
        hostname: 'PC8CC2082KZ7',
      },
      {
        roomId: rooms[0].id,
        number: 4,
        mac: 'A8-B1-3B-74-13-8A',
        ip: '10.21.45.189',
        hostname: 'PC8CC2081NMK',
      },
      {
        roomId: rooms[0].id,
        number: 5,
        mac: 'A8-B1-3B-74-13-A6',
        ip: '10.21.45.190',
        hostname: 'PC8CC2081NQT',
      },
      {
        roomId: rooms[0].id,
        number: 6,
        mac: 'A8-B1-3B-74-12-16',
        ip: '10.21.45.191',
        hostname: 'PC8CC2081NQ5',
      },
      {
        roomId: rooms[0].id,
        number: 7,
        mac: 'A8-B1-3B-74-82-CE',
        ip: '10.21.45.192',
        hostname: 'PC8CC2082KZY',
      },
      {
        roomId: rooms[0].id,
        number: 8,
        mac: 'A8-B1-3B-74-82-59',
        ip: '10.21.45.193',
        hostname: 'PC8CC2082KYK',
      },
      {
        roomId: rooms[0].id,
        number: 9,
        mac: 'A8-B1-3B-74-12-15',
        ip: '10.21.45.194',
        hostname: 'PC8CC2081NP7',
      },
      {
        roomId: rooms[0].id,
        number: 10,
        mac: '38-22-E2-1E-20-17',
        ip: '10.21.45.195',
        hostname: 'PC202010000062-COMP10',
      },
      {
        roomId: rooms[0].id,
        number: 11,
        mac: '38-22-E2-1C-EB-44',
        ip: '10.21.45.196',
        hostname: 'PC202010000057-COMP04',
      },
      {
        roomId: rooms[0].id,
        number: 12,
        mac: '38-22-E2-1E-1F-E6',
        ip: '10.21.45.197',
        hostname: 'PC202010000065-COMP12',
      },
      {
        roomId: rooms[0].id,
        number: 13,
        mac: '38-22-E2-1E-21-f7',
        ip: '10.21.45.198',
        hostname: 'PC202010000061-COMP05',
      },
      {
        roomId: rooms[0].id,
        number: 14,
        mac: '38-22-E2-1E-22-27',
        ip: '10.21.45.199',
        hostname: 'PC202010000066-COMP11',
      },
      {
        roomId: rooms[0].id,
        number: 16,
        mac: '38-22-E2-1E-1F-D2',
        ip: '10.21.45.201',
        hostname: 'PC202010000056-Comp3',
      },
      {
        roomId: rooms[0].id,
        number: 17,
        mac: '38-22-E2-1C-EB-18',
        ip: '10.21.45.202',
        hostname: 'PC202010000058-COMP08',
      },
      {
        roomId: rooms[0].id,
        number: 18,
        mac: '38-22-E2-1E-21-F8',
        ip: '10.21.45.203',
        hostname: 'PC202010000055-COMP02',
      },
      {
        roomId: rooms[0].id,
        number: 19,
        mac: '38-22-E2-1C-E8-E5',
        ip: '10.21.45.204',
        hostname: 'PC202010000062-COMP09',
      },
      {
        roomId: rooms[0].id,
        number: 20,
        mac: '38-22-E2-1E-21-3E',
        ip: '10.21.45.205',
        hostname: 'PC202010000054-COMP01',
      },
      {
        roomId: rooms[0].id,
        number: 21,
        mac: '38-22-E2-1E-1F-EA',
        ip: '10.21.45.206',
        hostname: 'PC202010000064-Comp00',
      },
    ],
  });

  await prisma.computer.createMany({
    data: [
      {
        roomId: rooms[1].id,
        number: 1,
        mac: 'E0-73-E7-D2-1D-2F',
        ip: '10.21.45.207',
        hostname: '5CD312F4SP',
      },
      {
        roomId: rooms[1].id,
        number: 2,
        mac: 'A8-B1-3B-70-5B-4F',
        ip: '10.21.45.208',
        hostname: 'PC8CC2081NNC',
      },
      {
        roomId: rooms[1].id,
        number: 3,
        mac: 'E0-73-E7-D2-1D-3F',
        ip: '10.21.45.209',
        hostname: '5CD312F4SP',
      },
      {
        roomId: rooms[1].id,
        number: 4,
        mac: 'A8-B1-3B-74-82-D8',
        ip: '10.21.45.210',
        hostname: 'PC8CC2082KZW',
      },
      {
        roomId: rooms[1].id,
        number: 5,
        mac: 'E0-73-E7-D2-1D-68',
        ip: '10.21.45.211',
        hostname: '5CD312F4SP',
      },
      {
        roomId: rooms[1].id,
        number: 6,
        mac: 'E0-73-E7-D2-25-66',
        ip: '10.21.45.212',
        hostname: '5CD312F4SP',
      },
      {
        roomId: rooms[1].id,
        number: 7,
        mac: 'A8-B1-3B-74-82-DD',
        ip: '10.21.45.213',
        hostname: 'PC8CC2082KZN',
      },
      {
        roomId: rooms[1].id,
        number: 8,
        mac: 'E0-73-E7-D2-1D-50',
        ip: '10.21.45.214',
        hostname: '5CD312F4SP',
      },
      {
        roomId: rooms[1].id,
        number: 9,
        mac: 'A8-B1-3B-74-13-43',
        ip: '10.21.45.215',
        hostname: 'PC8CC2081NPS',
      },
      {
        roomId: rooms[1].id,
        number: 10,
        mac: 'E0-73-E7-D2-1D-43',
        ip: '10.21.45.216',
        hostname: '5CD312F4SP',
      },
      {
        roomId: rooms[1].id,
        number: 11,
        mac: 'A8-B1-3B-74-13-BB',
        ip: '10.21.45.217',
        hostname: 'PC8CC2081NNP',
      },
      {
        roomId: rooms[1].id,
        number: 12,
        mac: 'A8-B1-3B-74-11-98',
        ip: '10.21.45.218',
        hostname: 'PC8CC2081NNP',
      },
      {
        roomId: rooms[1].id,
        number: 13,
        mac: 'A8-B1-3B-74-82-5A',
        ip: '10.21.45.219',
        hostname: 'PC8CC2082KYL',
      },
      {
        roomId: rooms[1].id,
        number: 14,
        mac: 'A8-B1-3B-74-11-91',
        ip: '10.21.45.220',
        hostname: 'PC8CC2081NQL',
      },
      // PC 15 DIE
      {
        roomId: rooms[1].id,
        number: 15,
        mac: 'none',
        ip: 'none',
        hostname: 'none',
      },
      {
        roomId: rooms[1].id,
        number: 16,
        mac: 'A8-B1-3B-74-12-1F',
        ip: '10.21.45.222',
        hostname: 'PC8CC2081NQP',
      },
      {
        roomId: rooms[1].id,
        number: 17,
        mac: 'A8-B1-3B-74-11-93',
        ip: '10.21.45.223',
        hostname: 'PC8CC2081NQG',
      },
      {
        roomId: rooms[1].id,
        number: 18,
        mac: 'A8-B1-3B-74-13-4C',
        ip: '10.21.45.224',
        hostname: 'PC8CC2081NPP',
      },
      {
        roomId: rooms[1].id,
        number: 19,
        mac: 'A8-B1-3B-74-82-E5',
        ip: '10.21.45.225',
        hostname: 'PC8CC2082KZ2',
      },
      {
        roomId: rooms[1].id,
        number: 20,
        mac: 'A8-B1-3B-74-13-A0',
        ip: '10.21.45.226',
        hostname: 'PC8CC2082KZ2',
      },
      {
        roomId: rooms[1].id,
        number: 21,
        mac: 'A8-B1-3B-74-13-A4',
        ip: '10.21.45.227',
        hostname: 'PC8CC2081NNP',
      },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
