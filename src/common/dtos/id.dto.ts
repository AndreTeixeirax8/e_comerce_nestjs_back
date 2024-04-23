import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class UUIDDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}


