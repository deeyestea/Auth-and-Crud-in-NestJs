import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsService } from './cats/cats.service';
import { Cat } from './cats/entities/cat.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module( {
  imports: [
    TypeOrmModule.forRoot( {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'desai',
      password: 'desai123',
      database: 'testdb',
      entities: [ Cat ],
      synchronize: true,
    } ),
    TypeOrmModule.forFeature( [ Cat ] ),
    AuthModule,
    UsersModule,
  ],
  providers: [ CatsService ],
  controllers: [ CatsController ],
} )
export class AppModule implements NestModule {
  configure ( consumer: MiddlewareConsumer ) {
    consumer.apply( LoggerMiddleware ).forRoutes( CatsController );
  }
}
