import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule'
import { TweetsService } from '../tweets.service';
import { Cache } from 'cache-manager'
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class CheckNewTweetsTask {
    private limit = 10

    constructor(
        @Inject(CACHE_MANAGER)
        private cache: Cache,
        private tweetService: TweetsService,
        @InjectQueue('emails')
        private emailsQueue: Queue
        ) {}

    @Interval(5000)
    async handle() {
        // Buscando a posição salva em cache
        let offset = await this.cache.get<number>('tweet-offset');
        offset = offset === undefined || offset === null ? 0 : offset;

        console.log(`offset: ${offset}`);

        // Buscando 10 tweets do banco a partir da posição salva em cache
        const tweets = await this.tweetService.findAll({
            offset,
            limit: this.limit
        });

        console.log(`quantidade de tweets: ${tweets.length}`)

        if(tweets.length === this.limit) {
            console.log(`batemos a meta`)

            await this.cache.set('tweet-offset', offset + this.limit, {
                ttl: 1* 60* 10,
            });

            this.emailsQueue.add({})
        }
    }
}
