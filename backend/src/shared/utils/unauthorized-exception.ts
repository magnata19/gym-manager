import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedExceptionDocResponse {
  @ApiProperty({
    example: 'E-mail ou senha inválidos.',
    description: 'Mensagem de erro informando que a autenticação falhou.',
  })
  message: string;

  @ApiProperty({
    example: 'Unauthorized',
    description: 'Código de status HTTP',
  })
  error: string;

  @ApiProperty({
    example: 401,
    description: 'Código de status HTTP',
  })
  statusCode: number;
}
