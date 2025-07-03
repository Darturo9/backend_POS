import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';

@Controller('phones')
export class PhonesController {
  constructor(private readonly phonesService: PhonesService) {}

  @Post()
  create(@Body() createPhoneDto: CreatePhoneDto) {
    return this.phonesService.create(createPhoneDto);
  }

  @Get()
  findAll() {
    return this.phonesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.phonesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updatePhoneDto: UpdatePhoneDto,
  ) {
    return this.phonesService.update(+id, updatePhoneDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.phonesService.remove(+id);
  }
}
