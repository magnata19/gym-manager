import { ApiProperty } from '@nestjs/swagger';

export class NotFoundExceptionDocResponse {
  @ApiProperty({
    example: 'Usuário com ID {id} não encontrado',
    description: 'Mensagem de erro indicando que o recurso não foi encontrado',
  })
  message: string;

  @ApiProperty({
    example: 404,
    description: 'Código de status HTTP',
  })
  error: string;

  @ApiProperty({
    example: 404,
    description: 'Código de status HTTP',
  })
  statusCode: number;
}
