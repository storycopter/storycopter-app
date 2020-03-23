import fluidify from '../functions/fluidify';

const sizes = {
  100: ['12px', '13px', '1.6em'],
  200: ['13px', '15px', '1.6em'],
  300: ['14px', '16px', '1.6em'],
  400: ['15px', '18px', '1.6em'],
  500: ['18px', '26px', '1.4em'],
  600: ['21px', '35px', '1.4em'],
  700: ['24px', '45px', '1.4em'],
  800: ['27px', '55px', '1.2em'],
  900: ['30px', '80px', '1.2em'],
};

export default function setType(size) {
  const range = { min: sizes[size][0], max: sizes[size][1] };
  return { ...fluidify('fontSize', range), [`lineHeight`]: sizes[size][2] };
}
