export declare class EmailService {
    private transporter;
    sendOtp(email: string, otp: string): Promise<boolean>;
}
