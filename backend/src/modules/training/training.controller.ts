import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingDto } from './dto/training.dto';
import { IRequest } from 'src/shared/interface/IRequest';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IMessageInterface } from '../users/interface/IMessageResponse';
import { ITraining } from './interface/Itraining.interface';

@Controller('training')
@ApiTags('Training')
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

  @Get(':id')
  @UseGuards(AuthGuard)
  async getTrainingById(
    @Req() req: IRequest,
    @Param('id') id: string,
  ): Promise<ITraining> {
    const userId = req.user.id;
    return this.trainingService.getTrainingById(userId!, id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateTraining(
    @Req() req: IRequest,
    @Param('id') id: string,
    @Body() body: Partial<TrainingDto>,
  ): Promise<IMessageInterface> {
    const userId = req.user.id;
    return this.trainingService.updateTraining(userId!, id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteTraining(
    @Req() req: IRequest,
    @Param('id') id: string,
  ): Promise<IMessageInterface> {
    const userId = req.user.id;
    return this.trainingService.deleteTraining(userId!, id);
  }
}
