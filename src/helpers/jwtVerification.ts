import jwt from "jsonwebtoken";

export const jwtVerification = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
        if(err){
            return err;
        }
        return payload
    });

}

export const generateToken = (id: number) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "1d" })
}