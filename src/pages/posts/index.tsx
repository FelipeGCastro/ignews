import { GetStaticProps } from 'next'
import Link from 'next/link'
import Prismic from '@prismicio/client'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic'
import styles from './styles.module.scss'
import { RichText } from 'prismic-dom'
import { useSession } from 'next-auth/client'

type Story = {
    slug: string
    title: string
    thumbUrl: string
    updatedAt: string
}
interface StoriesProps {
    stories: Story[]
}

export default function Posts({ stories }: StoriesProps) {
    console.log(stories)
    return (
        <>
            <Head>
                <title>Posts | Ensine o Caminho</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    {stories.map(post => (
                        <Link key={post.slug} href={`/posts/${post.slug}`}>
                            <a >
                                <time>{post.updatedAt}</time>
                                <strong>{post.title}</strong>
                                <img src={post.thumbUrl} alt={post.title} />
                            </a>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()
    const response = await prismic.query(
        Prismic.predicates.at('document.type', 'story')
    , {
        fetch: ['story.title', 'story.thumbnail'],
        pageSize: 100,
    })
    const stories = response.results.map(story => {
        return {
            slug: story.uid,
            title: RichText.asText(story.data.title),
            thumbUrl: story.data.thumbnail.url,
            updatedAt: new Date(story.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })

        }
    })
    return {
        props: { stories }
    }
}