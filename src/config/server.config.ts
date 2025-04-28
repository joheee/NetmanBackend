import { registerAs } from '@nestjs/config';

export default registerAs('serverconfig', () => ({
  windowsUsername: process.env.WINDOWS_USERNAME,
  windowsPassword: process.env.WINDOWS_PASSWORD,
  sambaUsername: process.env.SAMBA_USERNAME,
  sambaPassword: process.env.SAMBA_PASSWORD,
}));
