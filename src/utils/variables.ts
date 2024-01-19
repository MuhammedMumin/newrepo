const allowedOrigins = ['http://localhost:5174', 'http://localhost:5173', 'https://linx.shamsu.dev', 'https://linx.pages.dev', 'https://linx-admin.pages.dev'];
const allowedHeaders = ['Authorization', 'content-type'];

//1 point = 0.3527mm
const POINT_TO_MM = 0.3527;

export function converCMToPoints(cm: number, variance: number = 2.9) {
  const inches = (cm + variance) / 2.54; // Convert centimeters to inches
  const points = inches * 72; // Convert inches to points (since there are 72 points in an inch)
  return points;
}

export function convertPointsToMM(points: number) {
  return points / POINT_TO_MM;
}
export { allowedHeaders, allowedOrigins };
