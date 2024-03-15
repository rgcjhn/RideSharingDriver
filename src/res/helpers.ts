const EARTH_RADIUS = 6371000; // meters
const DEG_TO_RAD = Math.PI / 180.0;
const THREE_PI = Math.PI * 3;
const TWO_PI = Math.PI * 2;

const toRadians = (deg: number) => deg * DEG_TO_RAD;
const toDegrees = (rad: number) => rad / DEG_TO_RAD;

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// This code is taken from https://github.com/rmrs/random-location/blob/master/src/index.js
const randomCircumferencePoint = (
  centerPoint: { latitude: number; longitude: number },
  radius: number, // meters
  randomFn = Math.random
) => {
  const sinLat = Math.sin(toRadians(centerPoint.latitude));
  const cosLat = Math.cos(toRadians(centerPoint.latitude));

  // Random bearing (direction out 360 degrees)
  const bearing = randomFn() * TWO_PI;
  const sinBearing = Math.sin(bearing);
  const cosBearing = Math.cos(bearing);

  // Theta is the approximated angular distance
  const theta = radius / EARTH_RADIUS;
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);

  let rLatitude, rLongitude;
  rLatitude = Math.asin(sinLat * cosTheta + cosLat * sinTheta * cosBearing);

  rLongitude =
    toRadians(centerPoint.longitude) +
    Math.atan2(
      sinBearing * sinTheta * cosLat,
      cosTheta - sinLat * Math.sin(rLatitude)
    );

  // Normalize longitude L such that -PI < L < +PI
  rLongitude = ((rLongitude + THREE_PI) % TWO_PI) - Math.PI;

  return { latitude: toDegrees(rLatitude), longitude: toDegrees(rLongitude) };
};

const helpers = {
  timeout,
  randomCircumferencePoint,
};

export default helpers;
