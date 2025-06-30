import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';
import { endOfDay, isAfter } from 'date-fns';

@Injectable()
export class CouponsService {

  constructor(
    @InjectRepository(Coupon) private readonly couponRepository: Repository<Coupon>
  ) { }

  async create(createCouponDto: CreateCouponDto) {
    const existing = await this.couponRepository.findOneBy({ name: createCouponDto.name });
    if (existing) {
      throw new Error(`Ya existe un cupón con el nombre ${createCouponDto.name}`);
    }
    return this.couponRepository.save(createCouponDto);
  }

  findAll() {
    return this.couponRepository.find()
  }

  async findOne(id: number) {
    const coupon = await this.couponRepository.findOneBy({ id: id })
    if (!coupon) {
      throw new NotFoundException(`El cupón con el id ${coupon} no existe`)
    }
    return coupon
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    // Verifica si el nombre está siendo cambiado y si ya existe otro cupón con ese nombre
    if (updateCouponDto.name) {
      const existing = await this.couponRepository.findOneBy({ name: updateCouponDto.name });
      if (existing && existing.id !== id) {
        throw new Error(`Ya existe un cupón con el nombre ${updateCouponDto.name}`);
      }
    }
    const coupon = await this.findOne(id)
    Object.assign(coupon, updateCouponDto)
    return await this.couponRepository.save(coupon)
  }


  async remove(id: number) {

    const coupon = await this.findOne(id)
    if (coupon) {
      await this.couponRepository.remove(coupon)
    }
    return "Cupon eliminado"

  }


  async applyCoupon(name: string) {
    const coupon = await this.couponRepository.findOneBy({ name })
    if (!coupon) {
      throw new NotFoundException(`El cupón con el nombre ${name} no existe`)
    }

    const currentDate = new Date()
    const expirationDate = endOfDay(coupon.expirationDate)

    if (isAfter(currentDate, expirationDate)) {
      throw new UnprocessableEntityException("El cupón ya expiró")
    }

    return {
      message: "Cupón Válido",
      ...coupon
    }

  }


}
