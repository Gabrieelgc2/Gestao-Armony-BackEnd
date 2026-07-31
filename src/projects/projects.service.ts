import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    const projects = await this.prisma.project.findMany();
    return projects
  }

  async findById(id: string) {
    return await this.prisma.project.findUnique({ where: { id } });
  }
}