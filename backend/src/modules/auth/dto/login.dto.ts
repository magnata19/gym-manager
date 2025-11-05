import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'O email do usuário.',
  })
  email: string;
  @ApiProperty({
    example: 'senhaSegura123',
    description: 'A senha do usuário.',
  })
  password: string;
}
