import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

describe('AuthService', () => {
    let service: AuthService;
    beforeEach(async () => {
        const fakeUserService = {
            find: () => Promise.resolve([]),
            create: (email:string,password:string) => 
                Promise.resolve({id:1,email,password}),
            
        }
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService,
                }
            ]
        }).compile();
    
        service = module.get(AuthService)
    })
    it('can it create instance of service',async () => {
        expect(service).toBeDefined();
    })
    it('create new user with salted and hashed password', async() => {
        const user = await service.signup('asdt@gnes.com','fdsd');
        expect(user.password).not.toEqual('fdsd');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    })
})
