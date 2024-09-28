import { ServiceType } from "../provider/MifProvider";

export const getUrl = (domain: string, serviceType: ServiceType): string => {
    if (serviceType === ServiceType.CONFIG) {
        return `http://localhost:4040/api/tcSpaconMissionInterface/${domain}`;
    } 

    if (serviceType === ServiceType.FILE) {
        return `http://localhost:4040/api/tcSpaconMissionInterface/files/${domain}`;
    }
    
    return "";
}