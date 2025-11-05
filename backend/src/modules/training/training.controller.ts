import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingDto } from './dto/training.dto';
import { IRequest } from 'src/shared/interface/IRequest';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IMessageInterface } from '../users/interface/IMessageResponse';

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Cria um novo treino para o usuário autenticado.' })
  @ApiResponse({
    status: 201,
    description: 'Treino criado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiBearerAuth(AuthGuard.name)
  async createTraining(
    @Body() body: TrainingDto,
    @Req() req: IRequest,
  ): Promise<IMessageInterface> {
    const userId = req.user.id;
    return this.trainingService.createTraining(body, userId!);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getTrainingByUserId(@Req() req: IRequest) {
    const userId = req.user.id;
    const trainings = await this.trainingService.getTrainingsByUserId(userId!);
    return trainings;
  }
}
