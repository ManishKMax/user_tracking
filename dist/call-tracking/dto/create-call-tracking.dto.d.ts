import { CallType } from '../entities/call-tracking.entity';
export declare class CreateCallTrackingDto {
    call_type: CallType;
    recording_url: string;
    duration: string;
}
