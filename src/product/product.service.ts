import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepository.save(createProductDto);
    return newProduct;
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const findProduct = await this.productRepository.findOneBy({ id });
    if (!findProduct) {
      throw new HttpException('Produto não localizado', HttpStatus.NOT_FOUND);
    }
    return findProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const {
      title,
      description,
      imgUrl1,
      price,
      quantity,
      size,
      color,
      shippings,
      sex,
      brands,
      category,
      subcategory,
    } = updateProductDto;

    const findProduct = await this.productRepository.findOneBy({ id });

    if (!findProduct) {
      throw new HttpException('Produto não localizado', HttpStatus.NOT_FOUND);
    }

    let updateProduct: any = {};

    title && (updateProduct.title = title);
    description && (updateProduct.description = description);
    imgUrl1 && (updateProduct.imgUrl1 = imgUrl1);
    price && (updateProduct.price = price);
    quantity && (updateProduct.price = quantity);
    size && (updateProduct.size = size);
    color && (updateProduct.color = color);
    shippings && (updateProduct.shippings = shippings);
    sex && (updateProduct.sex = sex);
    brands && (updateProduct.brands = brands);
    category && (updateProduct.category = category);
    subcategory && (updateProduct.subcategory = subcategory);

    await this.productRepository.update({ id: id }, updateProduct);

    const findProductAgain = await this.productRepository.findOneBy({ id });

    return findProductAgain;
  }

  async remove(id: string) {
    const findProduct = await this.productRepository.findOneBy({ id });

    if (!findProduct) {
      throw new HttpException('Produto não localizado', HttpStatus.NOT_FOUND);
    }

    await this.productRepository.remove(findProduct);

    return 'Produto excluido';
  }
}
