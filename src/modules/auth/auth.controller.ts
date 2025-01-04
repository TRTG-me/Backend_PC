import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt_guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly userService: UserService
    ){}

    @ApiTags('API')
    @ApiResponse({status: 201, type: CreateUserDTO})
        @Post('register')
        register (@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
            return this.authService.registerUsers(dto)
        }
    @ApiTags('API')
    @ApiResponse({status: 200, type: AuthUserResponse    })
        @Post('login')
        login (@Body() dto:UserLoginDTO): Promise<AuthUserResponse>{
            return this.authService.loginUser(dto)
        }

    @UseGuards(JwtAuthGuard)
    @Get('get-public-user-info')
    getPublicUserInfo (@Req() request) {
        const user = request.user
        console.log(user)
        return this.userService.publicUser(user.email)
    }
    }
