import { AfterInsert, AfterRemove,AfterUpdate, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";

import { Report } from "src/reports/report.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email:string;
    
    @Column()
    password:string;

    @OneToMany(()=> Report, (report)=> report.user)
    reports: Report[]

    @AfterInsert()
    logInsert(){
        console.log(`Inserted user with id: ${this.id}`)
    }
    
    @AfterRemove()
    logRemove(){
        console.log(`Inserted user with id: ${this.id}`)
    }
    
    @AfterUpdate()
    logUpdate(){
        console.log(`Inserted user with id: ${this.id}`)
    }
}