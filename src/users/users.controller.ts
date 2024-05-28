import { Body,Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, UseInterceptors, ClassSerializerInterceptor, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dtos';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UpdateUserDtos } from './dtos/update-user.dtos';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dtos';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class UsersController {
    constructor (private userService: UsersService,
        private authService: AuthService
    ){}

    @Post('/signup')
    async createUser(@Body() body:CreateUserDto, @Session() session:any){
        const user = await this.authService.signup(body.email,body.password)
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session:any){
        const user = await this.authService.signin(body.email,body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signout')
    signout(@Session() session:any){
        session.userId = null;
    }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoami(@CurrentUser() user:User){
        return user;
    }
    // @UseInterceptors(new SerializeInterceptor (UserDto))
    @Serialize(UserDto)
    @Get('/:id')
    async findUser(@Param('id') id:string){
        console.log('handler is running');
        const user = await this.userService.findOne(parseInt(id));
        if(!user) throw new NotFoundException('User Not Found');
        return user
    }

    @Get()
    findAllUsers(@Query('email') email:string){
        return this.userService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string){
        this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body: UpdateUserDtos){
        return this.userService.update(parseInt(id), body);
    }
}
