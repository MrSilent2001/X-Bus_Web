export const generateVerificationCode = ():string =>{
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    return verificationCode.toString();
}

export const expireVerification = ():string =>{
    return new Date(
        Date.now() + 10 * 60 * 1000
    ).toISOString();
}