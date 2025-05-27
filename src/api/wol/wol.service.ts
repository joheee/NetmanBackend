/* eslint-disable @typescript-eslint/no-var-requires */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWolDto } from './dto/create-wol.dto';

interface WolResponse {
  success: boolean;
  message: string;
  macAddresses: string[];
  timestamp: Date;
}

@Injectable()
export class WolService {
  async create(createWolDto: CreateWolDto): Promise<WolResponse> {
    const wol = require('wake_on_lan');

    try {
      await Promise.all(createWolDto.mac.map((mac) => wol.wake(mac)));

      return {
        success: true,
        message: `Successfully sent Wake-on-LAN packets to ${createWolDto.mac.length} device(s)`,
        macAddresses: createWolDto.mac,
        timestamp: new Date(),
      };
    } catch (error) {
      throw new BadRequestException(
        `Failed to send Wake-on-LAN packets: ${error.message || error}`,
      );
    }
  }
}
