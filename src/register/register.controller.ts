import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
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

  @Get()
  findAll(): Observable<IRegister[]> {
  return this._clientProxyRegister.send(RegisterMSG.FIND_ALL, '');
  }

  @Get('Schedule/:start/:end')
  findSchedule(
    @Param('start') start: string,
    @Param('end') end: string,
  ): Observable<IRegister[]> {
    try {
      // Verificar si los parámetros start y end son válidos
      if (!start || !end) {
        throw new HttpException('Los parámetros start y end son obligatorios', HttpStatus.BAD_REQUEST);
      }

      return this._clientProxyRegister.send<IRegister[]>(RegisterMSG.FIND_SCHEDULE, { start, end });
    } catch (error) {
      throw new HttpException('Error al buscar horarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('ScheduleById/:start/:end/:id')
  findScheduleById(
    @Param('start') start: string,
    @Param('end') end: string,
    @Param('id') id: string,
  ): Observable<IRegister[]> {
    try {
      // Verificar si los parámetros start y end son válidos
      if (!start || !end) {
        throw new HttpException('Los parámetros start y end son obligatorios', HttpStatus.BAD_REQUEST);
      }

      return this._clientProxyRegister.send<IRegister[]>(RegisterMSG.FIND_SCHEDULE_ID, { start, end, id });
    } catch (error) {
      throw new HttpException('Error al buscar horarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
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

  @Patch(':id/checkOut')
  setCheckOut(
    @Param('id') id: string,
    @Body() updateRegisterDto: RegisterDTO,
  ): Observable<IRegister> {
    console.log(`Received check-out request for register ${id} with body:`, updateRegisterDto)
    return this._clientProxyRegister.send(RegisterMSG.UPDATE_PARTIAL,{ id, updateRegisterDto});
  }

  @Patch(':id/checkIn')
  setCheckIn(
    @Param('id') id: string,
    @Body() updateRegisterDto: RegisterDTO,
  ): Observable<IRegister> {
    console.log(`Received check-out request for register ${id} with body:`, updateRegisterDto)
    return this._clientProxyRegister.send(RegisterMSG.UPDATE_PARTIAL,{ id, updateRegisterDto});
  }

  @Patch(':id/editAttendance')
  editAttendance(
    @Param('id') id: string,
    @Body() updateRegisterDto: RegisterDTO,
  ): Observable<IRegister> {
    console.log(`Received edit attendance request for register ${id} with body:`, updateRegisterDto)
    return this._clientProxyRegister.send(RegisterMSG.UPDATE_PARTIAL,{ id, updateRegisterDto});
  }

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