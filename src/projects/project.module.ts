import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaService } from 'prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Module({
  imports: [],
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService, JwtAuthGuard],
})
export class ProjectModule {}
