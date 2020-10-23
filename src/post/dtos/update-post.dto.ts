import {
  IsNotEmpty,
  MaxLength,
  IsUrl
} from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty({
    message: 'Informe o título do post',
  })
  @MaxLength(200, {
    message: 'O título do post deve ter menos de 200 caracteres',
  })
  title: string;

  @IsNotEmpty({
    message: 'Informe a descrição do post',
  })
  @MaxLength(200, {
    message: 'A descrição do post deve ter menos de 200 caracteres',
  })
  description: string;

  @IsNotEmpty({
    message: 'Informe a url da imagem do post',
  })
  @MaxLength(200, {
    message: 'A url da imagem do post deve ter menos de 200 caracteres',
  })
  @IsUrl({}, {
    message: 'A URL informada não é válida'
  })
  image: string;
}

