import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dispatcher } from './entity/dispatcher.entity';
import { Repository } from 'typeorm';
import { CreateaDipatcherDto } from './dto/create-dispatcher.dto';

@Injectable()
export class DispatchersService {
  constructor(
    @InjectRepository(Dispatcher)
    private readonly dispatcherRepo: Repository<Dispatcher>,
  ) {}

  async createDispatcher(
    craeteDispatcherDto: CreateaDipatcherDto,
  ): Promise<Dispatcher> {
    const vehicle = this.dispatcherRepo.create(craeteDispatcherDto);
    return this.dispatcherRepo.save(vehicle);
  }

  async getVehiclesByLocation(city: string) {
    // const 
  }
}
