import rss from '@astrojs/rss';
import siteConfig from '../data/site-config.ts';
import { getAllPostsForRSS } from '../lib/sanity.ts';

export async function GET(context) {
    const posts = await getAllPostsForRSS();
    return rss({
        title: siteConfig.title,
        description: siteConfig.description,
        site: context.site,
        items: posts.map((post) => ({
            title: post.title,
            link: `/blog/${post.slug}/`,
            pubDate: new Date(post.date)
        }))
    });
}
