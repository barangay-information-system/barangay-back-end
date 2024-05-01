export class CreateAuditTrailDto {
    id?: number
    transId: string;
    userId: string;
    userName: string;
    transType: string;
    reference: string;
    actions: string;
    IP: string;
    PC: string;
    status: string;
}
