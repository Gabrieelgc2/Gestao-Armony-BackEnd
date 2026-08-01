import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, ParseUUIDPipe, Patch } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { UUID } from "crypto";

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
  ) {}

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    const project = await this.projectsService.findById(id);

    
    if (!project) {
      throw new NotFoundException(`Projeto com ID ${id} não encontrado.`);
    }

    return project;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateData: any,
  ) {
    return this.projectsService.update(id, updateData);
  }
}