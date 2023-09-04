import { JwtService } from "@nestjs/jwt";

export async function generateBearerToken(jwtService: JwtService): Promise<string> {
    const payload = {
        agw: process.env.PAYLOAD_AGW_KEY,
        exp: Math.round(
            (new Date().getTime() / 1000)
            + Number(process.env.PAYLOAD_EXP_TIME),
        ),
    };
    

    return await jwtService.signAsync(payload);
}