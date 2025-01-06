import {Body, Controller, Delete, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdatePasswordDTO, UpdateUserDto } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt_guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiTags('API')
    @ApiResponse({status: 200, type: UpdateUserDto})
    @UseGuards(JwtAuthGuard)
    @Patch()
    updateUser(@Body() updateDto: UpdateUserDto, @Req() request): Promise<UpdateUserDto>{
        const user = request.user
        return this.userService.updateUser(user.id, updateDto)
    }

    @ApiTags('API')
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Patch('change-password')
    updatePassword(@Body() updatePasswordDTO: UpdatePasswordDTO, @Req() request): Promise<any>{
        const user = request.user
        return this.userService.updatePassword(user.id, updatePasswordDTO)
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser(@Req() request): Promise<boolean>{
        const user = request.user
        return this.userService.deleteUser(user.id)
    }
    }

