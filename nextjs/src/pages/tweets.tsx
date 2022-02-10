import { NextPage } from "next";
import useSWR from "swr";
import http from "../utils/http";
import { Tweet } from "../utils/models";
import { Title } from "../components/Title";

const fetcher = (url: string) => http.get(url).then(res => res.data);

const TweetsPage: NextPage = () => {

    const { data: tweets, } = useSWR<Tweet[]>('tweets', fetcher);

    if(tweets)
        tweets.forEach(tweet => console.log(tweet.Text));

    return (
        <div>
            <Title> Tweets </Title>
            Lista...
        </div>
    );
};

export default TweetsPage;