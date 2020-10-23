import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '192.168.16.136',
  port: 5432,
  username: 'pguser',
  password: 'pgpassword',
  database: 'flink',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
