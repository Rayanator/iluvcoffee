import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'stong',
      brand: 'nespresso',
      flavors: ['chocolat', 'noisette'],
    },
    {
      id: 2,
      name: 'light',
      brand: 'marqueX',
      flavors: ['Caramette', 'gingembre'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with id: ${id} does not exist in db`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto;
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (!existingCoffee) {
      throw new NotFoundException();
    }
    const index = this.coffees.findIndex((coffee) => coffee.id === +id);
    this.coffees.splice(index, 1);
    this.coffees.push({ id: +id, ...updateCoffeeDto });
  }
  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
