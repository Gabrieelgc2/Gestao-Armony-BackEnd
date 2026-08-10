import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";
import { CreateProjectDto } from "src/dto/create-project.dto";

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

  async createProject(createProjectDto: CreateProjectDto){
    return await this.prisma.project.create({
      data: createProjectDto
    })
  }

  async update(id: string, data: Prisma.ProjectUpdateInput) {
    try {
      // O Prisma executa o UPDATE no Postgres/Supabase apenas nos campos enviados em 'data'
      const updatedProject = await this.prisma.project.update({
        where: { id },
        data,
      });

      return updatedProject;
    } catch (error) {
      // Código 'P2025' do Prisma = Registro não encontrado para o ID informado
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Projeto com o ID "${id}" não foi encontrado.`);
      }

      // Re-lança outros erros inesperados do banco
      throw error;
    }
  }
}