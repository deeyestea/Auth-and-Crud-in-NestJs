import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { CatsService } from './cats.service';
// import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller( 'cats' )
export class CatsController {
  constructor ( private readonly catsService: CatsService ) { }

  @Post( 'create' )
  createCat ( @Body() updateCatDto: UpdateCatDto ) {
    return this.catsService.createCat( updateCatDto );
  }

  @Get( 'find-all-cat' )
  findAllCat () {
    return this.catsService.findAllCats();
  }

  @Get( 'find-cat/:id' )
  findCat ( @Param( 'id' ) id: number ) {
    return this.catsService.findCatById( id )
  }

  @Put( 'update-cat/:id' )
  updateCat ( @Param( 'id' ) id: number, @Body() updateCatDto: UpdateCatDto ) {
    return this.catsService.updateCat( id, updateCatDto )
  }

  @Delete('delete-cat/:id')
  deleteCat(@Param('id') id: number) {
    return this.catsService.deleteCat(id);
  }
}
