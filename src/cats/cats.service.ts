import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
// import { Cat } from './interfaces/cat.interface';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor (
    @InjectRepository( Cat )
    private readonly catReposiory: Repository<Cat>,
  ) { }

  async createCat ( updateCatDto: UpdateCatDto ): Promise<Cat> {
    const cat = await this.catReposiory.create( updateCatDto );
    return this.catReposiory.save( cat );
  }

  async findAllCats (): Promise<Cat[]> {
    return await this.catReposiory.find();
  }

  async findCatById ( id: number ) {
    return await this.catReposiory.findOneBy( { id } )
  }

  async updateCat ( id: number, updateCatDto: UpdateCatDto ): Promise<Cat> {
    const cat = await this.catReposiory.findOneBy( { id } )
    if ( !cat ) {
      throw new NotFoundException( `Cat with ID ${ id } not found` );
    }

    Object.assign( cat, updateCatDto );
    return this.catReposiory.save( cat );
  }

  async deleteCat(id: number) {
    const cat = await this.catReposiory.delete(id)
  }
}
