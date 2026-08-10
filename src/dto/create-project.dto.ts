import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name_project: string;

  @IsString()
  @IsNotEmpty()
  order_number: string;

  @IsString()
  @IsNotEmpty()
  installation_location: string;

  @IsNumber()
  production_deadline: number;

  @IsString()
  @IsNotEmpty()
  contato_cliente: string;
}