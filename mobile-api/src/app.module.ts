// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { EmailModule } from './email/email.module';
// import { ConfigModule } from '@nestjs/config';

// @Module({
//   imports: [AuthModule, UsersModule, EmailModule,
//     ConfigModule.forRoot({
//       isGlobal: true,
//     })
//     ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';

import { MongooseModule }
from '@nestjs/mongoose';

import { AuthModule }
from './auth/auth.module';

import { UsersModule }
from './users/users.module';

@Module({
  imports: [

    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/mobile-api'
    ),

    AuthModule,

    UsersModule,
  ],
})

export class AppModule {}