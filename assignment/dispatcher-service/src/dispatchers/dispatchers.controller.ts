import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DispatchersService } from './dispatchers.service';
import { Dispatcher } from './entity/dispatcher.entity';
import { CreateaDipatcherDto } from './dto/create-dispatcher.dto';

@Controller('dispatchers')
export class DispatchersController {
  constructor(private readonly dispatcherService: DispatchersService) {}

  @Post()
  async createVehicle(
    @Body() createDispatchDto: CreateaDipatcherDto,
  ): Promise<Dispatcher> {
    return this.dispatcherService.createDispatcher(createDispatchDto);
  }

  @Get(':city')
  async getVehiclesByCity(@Param('city') city: string) {
    return this.dispatcherService.getVehiclesByLocation(city);
  }
}
