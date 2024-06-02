import { Controller, Body, Post, UseGuards, Patch, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/createreport.dtos';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { reportDto } from './dtos/report.dtos';
import { ApproveReportDto } from './dtos/approve-report.dtos';

@Controller('reports')
export class ReportsController {

    constructor(private reportsService: ReportsService){}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(reportDto)
    createReport(@Body() body:CreateReportDto, @CurrentUser() user:User){
        return this.reportsService.create(body,user);
    }
    @Patch('/:id')
    approveReport(@Param('id') id: number, @Body() body:ApproveReportDto){

    }
}
