import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ClientProxyWebMovil } from "src/common/proxy/client-proxy";
import { RegisterDTO } from "./dto/register.dto";
import { Observable } from "rxjs";
import { IRegister } from "src/common/interfaces/register.interface";
import { RegisterMSG, UserMSG } from "src/common/constants";


@ApiTags('registers')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/register')
export class RegisterController {
  constructor(private readonly clientProxy: 
    ClientProxyWebMovil) {}

  private _clientProxyRegister = this.clientProxy.clientProxyRegisters();
  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  @Post()
  create(@Body() registerDTO: RegisterDTO): Observable<IRegister> {
    return this._clientProxyRegister.send(RegisterMSG.CREATE, registerDTO);
  }

  // @Get()
  // findAll(): Observable<IRegister[]> {
  //   return this._clientProxyRegister.send(RegisterMSG.FIND_ALL, '');
  // }

  @Get()
async findAll(): Promise<any> { // Cambié Observable<IRegister[]> a Promise<any> para manejar datos anidados
  const registers = await this._clientProxyRegister.send(RegisterMSG.FIND_ALL, '').toPromise();

  const detailedRegisters = await Promise.all(registers.map(async (register) => {
    const detailedUsers = await Promise.all(register.users.map(async (userId) => {
      return await this._clientProxyUser.send(UserMSG.FIND_ONE, userId).toPromise();
    }));
    return {
      ...register,
      users: detailedUsers
    };
  }));

  return detailedRegisters;
}


  @Get(':id')
  findOne(@Param('id') id: string): Observable<IRegister> {
    return this._clientProxyRegister.send(RegisterMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() registerDTO: RegisterDTO,
  ): Observable<IRegister> {
    return this._clientProxyRegister.send(RegisterMSG.UPDATE, { id, registerDTO });
  }

  // @Post(':registerId/user/:userId')
  // async addUser(
  //   @Param('registerId') registerId: string,
  //   @Param('userId') userId: string,
  // ) {
  //   const user = await this._clientProxyUser
  //     .send(UserMSG.FIND_ONE, userId)
  //     .toPromise();

  //   if (!user) {
  //     throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
  //   }

  //   return this._clientProxyRegister.send(RegisterMSG.ADD_USER, {
  //     registerId,
  //     userId,
  //   });
  // }


  @Post(':registerId/user/:userId')
  async addUser(
    @Param('registerId') registerId: string,
    @Param('userId') userId: string,
  ) {
    const user = await this._clientProxyUser
      .send(UserMSG.FIND_ONE, userId)
      .toPromise();
  
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
  
    await this._clientProxyRegister.send(RegisterMSG.ADD_USER, {
      registerId,
      userId,
    }).toPromise();
  
    // Obtener detalles del usuario asociado
    const userDetails = await this._clientProxyUser
      .send(UserMSG.FIND_ONE, userId)
      .toPromise();
  
    return {
      message: 'User added to register successfully',
      userDetails,
    };
  }





  
}