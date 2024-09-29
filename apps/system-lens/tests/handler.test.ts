// tests/handler.test.js
import { expect, test, describe, beforeAll, afterAll, afterEach} from "vitest";
import { server } from '../src/mocks/server'; 

beforeAll(() => {
    server.listen();
});
afterEach(() => {
    server.resetHandlers();
});
afterAll(() => {
    server.close();
});

///////////// GET REQUESTS /////////////
describe('GET Requests', () => {
    describe('GET All Processes from One Satellite', () => {
        test('GET Processes of Satellite 316', async () => {
            const response = await fetch('http://localhost:4040/api/supervisor/316');
            const data = await response.json();
            const firstSatellite = data[0];

            expect(firstSatellite.name).toBe('CPDTM');
            expect(firstSatellite.status).toBe('RUNNING');
        });
    });

    describe('GET One Process from One Satellite', () => {
        test('GET Processes of Satellite 316', async () => {
            const response = await fetch('http://localhost:4040/api/supervisor/316/prime/CPDEV');
            const process = await response.json();

            expect(process.name).toBe('CPDEV');
            expect(process.status).toBe('RUNNING');
            expect(process.id).toBe(5);
            expect(process.connections[0].name).toBe('4/PRIME/EVENTS');
            expect(process.connections[0].connected).toBe(false);
            expect(process.connections[1].name).toBe('4/PRIME/ParcEvReceiver');
            expect(process.connections[1].connected).toBe(true);
        });
    });
});

///////////// POST REQUESTS /////////////
describe('POST Requests', () => {
    test('POST Process CPDEV to Satellite 316', async () => {
        const response = await fetch('http://localhost:4040/api/supervisor/316/prime/CPDEV', { method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "c30ce96f0fce27580bd3bd3501bc58867b023249b22bc7772f3a92ed7fa8f143"
            },
            body: JSON.stringify({ "action": "STOP" })
        })

        const data = await response.json();

        expect(data.content.action).toBe('STOP');
    });

    test('POST No Authorization', async () => {
        const response = await fetch('http://localhost:4040/api/supervisor/316/prime/CPDEV', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "action": "STOP" })
        });

        const data = await response.json();
        expect(data.error).toBe('Authorization header not present. Access denied.')
    });
    test('POST Wrong Authorization', async () => {
        const response = await fetch('http://localhost:4040/api/supervisor/316/prime/CPDEV', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "123"
            },
            body: JSON.stringify({ "action": "STOP" })
        });

        const data = await response.json();
        expect(data.error).toBe('Incorrect token. Access denied.')
    });
});
