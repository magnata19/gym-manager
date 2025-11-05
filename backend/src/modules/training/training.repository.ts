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
      include: {
        user: true,
      },
    });
  }
}
