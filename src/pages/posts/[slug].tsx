import { GetServerSideProps } from "next"
import Head from 'next/head'
import { getSession } from "next-auth/client"
import { RichText } from "prismic-dom"
import { getPrismicClient } from "../../services/prismic"

import styles from './post.module.scss'
import { useState } from "react"
import { PlayerContent } from "../../components/PlayerContent"

type ImageItem = {
    imageUrl: string
    imageAlt: string
    primaryText: string
    secondaryText: string
}

interface StoryProps {
    story: {
        slug: string
        title: string
        thumbUrl: string
        gallery: ImageItem[]
        updatedAt: string
    }
}

export default function Post({ story }: StoryProps ) {
    const [slidePosition, setSlidePosition] = useState(0)
    return (
        <>
        <Head>
            <title>{story.title} | Ensine o Caminho</title>
        </Head>
        <main className={styles.container}>
            
                {slidePosition === 0 ? (
                    <article className={styles.post}>
                        <img src={story.thumbUrl}alt={story.title}/>
                        <div>                            
                            <h1>{story.title}</h1>
                            <time>{story.updatedAt}</time>
                        </div>
                    </article>
                ) : story.gallery.map((item, index) => (
                    <PlayerContent 
                    key={index.toString()}
                    imageAlt={item.imageAlt}
                    imageUrl={item.imageUrl}
                    primaryText={item.primaryText}
                    secondaryText={item.secondaryText}
                    />) )
                }
        </main>

        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req })
    const { slug } = params
    if (!session?.activeSubscription) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    const prismic = getPrismicClient(req)
    const response = await prismic.getByUID('story', String(slug), {})
   
    const story = {
        slug,
        title: RichText.asText(response.data.title),
        thumbUrl: response.data.thumbnail.url,
        gallery: response.data.body[0].items?.map(item => ({
            imageUrl: item.image.url,
            imageAlt: RichText.asText(item.alt_text),
            primaryText: RichText.asText(item.primary_text),
            secondaryText: RichText.asText(item.secondary_text)
        })),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }
    console.log(story)
    return {
        props: { story }
    }

}