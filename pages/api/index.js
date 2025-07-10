import { serialize } from 'cookie';
import { SignJWT } from 'jose';

let listings = [
  { "id": 1, "name": "Tata Nexon", "model": "2024", "status": 1 },
  { "id": 2, "name": "Hyundai Creta", "model": "2023", "status": 2 },
  { "id": 3, "name": "Maruti Suzuki Swift", "model": "2022", "status": 1 },
  { "id": 4, "name": "Mahindra XUV700", "model": "2021", "status": 0 },
  { "id": 5, "name": "Kia Seltos", "model": "2020", "status": 1 },
  { "id": 6, "name": "Honda City", "model": "2023", "status": 0 },
  { "id": 7, "name": "Toyota Fortuner", "model": "2024", "status": 1 },
  { "id": 8, "name": "Renault Kwid", "model": "2022", "status": 0 },
  { "id": 9, "name": "Skoda Kushaq", "model": "2020", "status": 1 },
  { "id": 10, "name": "Volkswagen Virtus", "model": "2021", "status": 0 },
  { "id": 11, "name": "Ford EcoSport", "model": "2023", "status": 1 },
  { "id": 12, "name": "Nissan Magnite", "model": "2024", "status": 0 },
  { "id": 13, "name": "MG Hector", "model": "2022", "status": 1 },
  { "id": 14, "name": "Hyundai i20", "model": "2021", "status": 0 },
  { "id": 15, "name": "Tata Punch", "model": "2020", "status": 1 },
  { "id": 16, "name": "Maruti Suzuki Baleno", "model": "2023", "status": 0 },
  { "id": 17, "name": "Honda Amaze", "model": "2022", "status": 1 },
  { "id": 18, "name": "Kia Carens", "model": "2020", "status": 0 },
  { "id": 19, "name": "Toyota Innova", "model": "2024", "status": 1 },
  { "id": 20, "name": "Mahindra Scorpio", "model": "2021", "status": 0 },
  { "id": 21, "name": "Jeep Compass", "model": "2023", "status": 1 },
  { "id": 22, "name": "Renault Triber", "model": "2020", "status": 0 },
  { "id": 23, "name": "Volkswagen Taigun", "model": "2022", "status": 1 },
  { "id": 24, "name": "Ford Figo", "model": "2021", "status": 0 },
  { "id": 25, "name": "Hyundai Verna", "model": "2024", "status": 1 },
  { "id": 26, "name": "Tata Harrier", "model": "2023", "status": 0 },
  { "id": 27, "name": "Skoda Slavia", "model": "2020", "status": 1 },
  { "id": 28, "name": "Maruti Suzuki Alto", "model": "2022", "status": 0 },
  { "id": 29, "name": "Mahindra Bolero", "model": "2021", "status": 1 },
  { "id": 30, "name": "Nissan Kicks", "model": "2020", "status": 0 },
  { "id": 31, "name": "MG Astor", "model": "2023", "status": 1 },
  { "id": 32, "name": "Honda WR-V", "model": "2021", "status": 0 },
  { "id": 33, "name": "Toyota Urban Cruiser", "model": "2022", "status": 1 },
  { "id": 34, "name": "Tata Safari", "model": "2024", "status": 0 },
  { "id": 35, "name": "Hyundai Grand i10", "model": "2023", "status": 1 }
];

let auditLog = []

const login = [{ username: 'admin', password: 'admin' }]

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'jFhs8HvW0y7Yy4tK4JzqUK9VeR74V5Fe1XzgMQ3nF8A=');

export default async function handler(req, res) {
  if (req.url?.includes('get')) return res.status(200).json(listings)

  if (req.url?.includes('status')) {
    try {
      const { id, status } = req.body;
      listings = listings.map(val =>
        val.id === id ? { ...val, status } : val
      );
    } catch { return res.status(400).json({ message: 'Not Update' }) }
    return res.status(200).json({ message: 'Updated' });
  }

  if (req.url?.includes('update')) {
    try {
      const { id, data } = req.body;
      listings = listings.map(val =>
        val.id === id ? { ...val, ...data } : val
      );
      return res.status(200).json({ message: 'Successful' });
    } catch { return res.status(400).json({ message: 'Not Update' }) }
  }

  if (req.url?.includes('login')) {
    try {
      const { username, password, type } = req.body;
      if ((username == 'admin' && password == '12345') || type) {
        const token = await new SignJWT({ username })
          .setProtectedHeader({ alg: 'HS256' }).setExpirationTime('1h').sign(secret);

        res.setHeader('Set-Cookie', serialize('token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 }));
        return res.status(200).json({ message: 'Successful' });
      }
      return res.status(401).json({ message: 'Invalid credentials' });
    } catch {
      return res.status(400).json({ message: 'Invalid' });
    }

  }

  if (req.url?.includes('logout')) {
    try {
      const result = serialize('token', '', { httpOnly: true, path: '/', maxAge: -1, });
      res.setHeader('Set-Cookie', result);
      return res.status(200).json({ message: 'Logged out' });
    } catch {
      return res.status(400).json({ message: 'Not Logged out' });
    }
  }

  if(req.url?.includes('auditGet')){
    try{ return res.status(200).json(auditLog)}
    catch{return res.status(400).json({ message: 'Error' })}
  }

  if (req.url?.includes('auditUpdate')) {
    try {
      const { name, action, changeFrom, changeTo } = req.body;
      const data = [...auditLog]
      data.push({ name, action, changeFrom, changeTo })
      auditLog = data
      return res.status(200).json({ message: 'Audit Log Update', auditLog });
    }
    catch {
      return res.status(400).json({ message: 'Not Update' });
    }
  }

  res.status(400).end();
}
