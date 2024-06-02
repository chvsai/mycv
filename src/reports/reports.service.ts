import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/createreport.dtos';
import { User } from 'src/users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dtos';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report) private repo: Repository<Report>
    ){}
    create(reportDto: CreateReportDto, user: User){
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);
        
    }

    changeApproval(id:number, body: ApproveReportDto){
    // To be updated
    }

}
