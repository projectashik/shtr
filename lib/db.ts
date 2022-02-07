import { Prisma, PrismaClient } from "@prisma/client";

const options: Prisma.Subset<
  Prisma.PrismaClientOptions,
  Prisma.PrismaClientOptions
> = {
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
};

function logQuery(e: any) {
  if (process.env.LOG_QUERY) {
    console.log(e.params, "->", e.query, e.duration);
  }
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient(options);
  prisma.$on<any>("query", logQuery);
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(options);
    global.prisma.$on<any>("query", logQuery);
  }
  prisma = global.prisma;
}

export default prisma;
