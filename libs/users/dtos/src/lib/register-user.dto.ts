import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export { RegisterUserDto };
