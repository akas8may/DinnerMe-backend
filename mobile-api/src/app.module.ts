import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { MongooseModule }
from '@nestjs/mongoose';

import { AuthModule }
from './auth/auth.module';

import { UsersModule }
from './users/users.module';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [

        {
          use: HeaderResolver,
          options: [
            'accept-language',
          ],
        },
      ],
    }),

    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mobile-api'
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule,

    UsersModule,
  ],
})

export class AppModule {}