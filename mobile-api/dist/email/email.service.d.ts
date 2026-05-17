export declare class EmailService {
    private transporter;
    sendOtp(email: string, otp: string, forlogin?: boolean): Promise<boolean>;
}
