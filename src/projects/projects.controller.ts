import { Body, Controller, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "src/dto/create-project.dto";

@Controller('projects')
// @UseGuards(JwtAuthGuard)
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

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectsService.createProject(createProjectDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateData: any,
  ) {
    return this.projectsService.update(id, updateData);
  }
}