import { PartialType } from '@nestjs/swagger';
import { CreateLogCommandComputerDto } from './create-log_command_computer.dto';

export class UpdateLogCommandComputerDto extends PartialType(CreateLogCommandComputerDto) {}
