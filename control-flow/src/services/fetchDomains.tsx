import PORT from '../helpers/ports';
import token from '../helpers/token';

interface ProcessData {
  key: string;
  value: string;
  readOnly: boolean;
}

const headers = {
  'Authorization': token 
};

// fetch(`${PORT}/${domain}/${server}`, {headers})
const fetchGetOneDomain = async (domain: string) => {
  const res = await fetch(`http://localhost:4040/api/tcSpaconMissionInterface/${domain}`, {headers})
  if (!res.ok) {
    throw new Error(`Network response was not ok. Status: ${res.status}. StatusText: ${res.statusText}`);
  }
  return await res.json();
}
  
export const fetchGetAllDomains = async (domains: string[]) => {
  const promises: Promise<ProcessData[]>[] = []

  domains.map(domain => promises.push(fetchGetOneDomain(domain)))

  return await Promise.all(promises)
}
      