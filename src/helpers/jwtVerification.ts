import jwt from "jsonwebtoken";

export const jwtVerification = (token: string) => {
    const verification = jwt.verify(token, process.env.JWT_SECRET as string);
    return verification;
}

export const generateToken = (id: number) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "1d" })
}