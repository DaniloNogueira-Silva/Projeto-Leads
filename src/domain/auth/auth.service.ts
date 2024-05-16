import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/service/user.service';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
    private readonly userService: UserService;
    private readonly jwtService: JwtService;

    constructor(userService: UserService, jwtService: JwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    async signIn(email: string, pass: string) {

        const user = await this.userService.findOne(email);
        if (!user) {
            throw new UnauthorizedException('Dados inválidos.');
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Senha inválida.');
        }
        const payload = { email: user.email, sub: user._id };
        return {
            token: await this.jwtService.signAsync(payload),
        };
    }
}
