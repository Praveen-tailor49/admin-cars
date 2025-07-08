const cars = [
  { "id": 1, "name": "Tata Nexon", "model": "2024", "status": 1 },
  { "id": 2, "name": "Hyundai Creta", "model": "2023", "status": 0 },
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

export async function GET() {
  return new Response(JSON.stringify(cars), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}