import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { TweetDocument, Tweet } from './schemas/tweet.schema';

@Injectable()
export class TweetsService {

  constructor(
    @InjectModel(Tweet.name)
    private tweetModel: Model<TweetDocument>,
  ) {}

  create(createTweetDto: CreateTweetDto) {
    return this.tweetModel.create(createTweetDto);
  }

  findAll({offset, limit}: {offset:number, limit:number} = {offset: 0, limit: 50}) {
    return this.tweetModel.find().skip(offset).limit(limit).exec();
  }

  findOne(id: string) {
    return this.tweetModel.findById(id);
  }

  async update(id: string, updateTweetDto: UpdateTweetDto) {
    await this.tweetModel.findByIdAndUpdate(id, updateTweetDto).exec();

    return this.findOne(id);
  }

  remove(id: string) {
    return this.tweetModel.findByIdAndRemove(id);
  }
}
