import { BadRequestException, Injectable } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { ITraining } from './interface/Itraining.interface';
import { IMessageInterface } from '../users/interface/IMessageResponse';

@Injectable()
export class TrainingService {
  constructor(private trainingRepository: TrainingRepository) {}

  async createTraining(
    body: ITraining,
    userId: string,
  ): Promise<IMessageInterface> {
    await this.trainingRepository.createTraining(body, userId);
    return { message: 'Treino criado com sucesso.' };
  }

  async getTrainingsByUserId(userId: string) {
    const trainings =
      await this.trainingRepository.getTrainingsByUserId(userId);
    trainings.forEach((training) => {
      if (training.userId != userId) {
        throw new BadRequestException(
          'Acesso negado aos treinos de outro usuário.',
        );
      }
    });
    return trainings;
  }
}
