import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min } from 'class-validator';

export class TrainingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Peito',
    description: 'Tipo de treino',
  })
  trainingKind: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Supino Reto',
    description: 'Exercício do treino',
  })
  exercise: string;

  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    example: 3,
    description: 'Quantidade de séries',
    minimum: 1,
  })
  serieQuantity: number;

  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    example: 12,
    description: 'Quantidade de repetições',
    minimum: 1,
  })
  repetitionQuantity: number;
}
