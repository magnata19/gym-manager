import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../interface/UserRole';

export class IResponseUserDto {
  @ApiProperty({
    example: 'ea8b2c06-72ed-44d7-8182-4bef03560b2f',
    description: 'ID do usuário',
  })
  id: string;
  @ApiProperty({ example: 'John Doe', description: 'Nome do usuário' })
  name: string;
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email do usuário',
  })
  email: string;
  role: UserRole[];
}
