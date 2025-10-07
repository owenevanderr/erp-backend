import { Body, Controller, Post, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from '../../common/public.decorator';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    description: 'Registers a user and returns JWT in Authorization header',
    headers: {
      Authorization: {
        description: 'Bearer <jwt>',
        schema: { type: 'string' },
      },
    },
  })
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const { token } = await this.authService.register(dto);
    res.setHeader('Authorization', `Bearer ${token}`);
    return { token };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Logs in and returns JWT in Authorization header',
    headers: {
      Authorization: {
        description: 'Bearer <jwt>',
        schema: { type: 'string' },
      },
    },
  })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { token } = await this.authService.login(dto);
    res.setHeader('Authorization', `Bearer ${token}`);
    return { token };
  }
}


