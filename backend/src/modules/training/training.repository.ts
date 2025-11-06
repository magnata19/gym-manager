import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ITraining } from './interface/Itraining.interface';

@Injectable()
export class TrainingRepository {
  constructor(private prismaService: PrismaService) {}

  async createTraining(body: ITraining, userId: string): Promise<void> {
    await this.prismaService.training.create({
      data: {
        trainingKind: body.trainingKind,
        exercise: body.exercise,
        serieQuantity: body.serieQuantity,
        repetitionQuantity: body.repetitionQuantity,
        userId: userId,
      },
    });
  }

  async getTrainingsByUserId(userId: string) {
    return this.prismaService.training.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async getTrainingById(userId: string, trainingId: string) {
    return this.prismaService.training.findFirst({
      where: {
        userId,
        id: trainingId,
      },
    });
  }

  async updateTraining(
    userId: string,
    trainingId: string,
    body: Partial<ITraining>,
  ) {
    return this.prismaService.training.update({
      where: {
        userId,
        id: trainingId,
      },
      data: body,
    });
  }

  async deleteTraining(trainingId: string, userId: string): Promise<any> {
    return this.prismaService.training.delete({
      where: {
        userId,
        id: trainingId,
      },
    });
  }
}
