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

  async getTrainingById(
    userId: string,
    trainingId: string,
  ): Promise<ITraining> {
    const training = await this.trainingRepository.getTrainingById(
      userId,
      trainingId,
    );
    if (!training || training.userId !== userId) {
      throw new BadRequestException(
        'Acesso negado ao treino de outro usuário.',
      );
    }
    return training as ITraining;
  }

  async updateTraining(
    userId: string,
    trainingId: string,
    body: Partial<ITraining>,
  ): Promise<IMessageInterface> {
    const training = await this.getTrainingById(userId, trainingId);
    if (!training) {
      throw new BadRequestException('Treino não encontrado.');
    }
    if (training.userId !== userId) {
      throw new BadRequestException(
        'Você não tem permissão para atualizar o treino de outro usuário.',
      );
    }
    await this.trainingRepository.updateTraining(userId, trainingId, body);
    return { message: 'Treino atualizado com sucesso.' };
  }

  async deleteTraining(
    userId: string,
    trainingId: string,
  ): Promise<IMessageInterface> {
    const training = await this.getTrainingById(userId, trainingId);
    if (!training) {
      throw new BadRequestException('Treino não encontrado.');
    }
    if (!training || training.userId !== userId) {
      throw new BadRequestException(
        'Você não tem permissão para deletar o treino de outro usuário.',
      );
    }
    await this.trainingRepository.deleteTraining(trainingId, userId);
    return { message: 'Treino deletado com sucesso.' };
  }
}
