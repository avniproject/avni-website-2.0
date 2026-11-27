/**
 * Media Gallery Page
 * Photo albums (data/media-gallery.ts), each photo linking to the blog post it comes from,
 * and the latest videos from the Avni YouTube channel (lib/youtube.ts).
 */

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, PlayCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import FadeIn from '@/components/ui/FadeIn';
import { galleryAlbums, GalleryPhoto } from '@/data/media-gallery';
import { fetchVideos } from '@/lib/youtube';

export const metadata: Metadata = {
  title: 'Media Gallery - Avni',
  description: 'Photos and videos of Avni in the field, at community events, and of the team behind it.',
  openGraph: {
    title: 'Media Gallery - Avni',
    description: 'Photos and videos of Avni in the field, at community events, and of the team behind it.',
    url: '/resources/media-gallery',
  },
  alternates: {
    canonical: '/resources/media-gallery',
  },
};

const VIDEOS_SHOWN = 8;
const YOUTUBE_CHANNEL = 'https://www.youtube.com/@avniproject';

function PhotoTile({ photo, large }: { photo: GalleryPhoto; large: boolean }) {
  return (
    <Link
      href={photo.href}
      className={`group relative block overflow-hidden rounded-2xl bg-[#EAECF0] ${large ? 'sm:col-span-2 sm:row-span-2' : ''}`}
    >
      <div className={`relative w-full ${large ? 'aspect-[4/3] sm:aspect-auto sm:h-full' : 'aspect-[4/3]'}`}>
        <Image
          src={photo.src}
          alt={photo.caption}
          fill
          sizes={large ? '(max-width: 640px) 100vw, 50vw' : '(max-width: 640px) 100vw, 25vw'}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {/* Caption: always on phones, on hover on larger screens */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 pt-10 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <p className="font-noto text-sm font-medium text-white">{photo.caption}</p>
        <span className="inline-flex items-center gap-1 font-noto text-xs text-white/80">Read the story <ArrowUpRight size={12} /></span>
      </div>
    </Link>
  );
}

export default async function MediaGalleryPage() {
  const videos = (await fetchVideos()).slice(0, VIDEOS_SHOWN);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-[72px]">
        <Section spacing="sm" className="bg-white py-8 md:py-12">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <p className="font-anek font-medium text-sm md:text-base leading-tight text-[#fba47e] uppercase mb-3">
                MEDIA GALLERY
              </p>
              <h1 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-[#0b2540] mb-4">
                Avni In Pictures
              </h1>
              <p className="font-noto text-base md:text-lg leading-relaxed text-[#000000]/70 mb-6">
                From villages and clinics to conferences and cohorts: the people and places behind Avni.
                Click a photo to read its story.
              </p>
              <nav aria-label="Albums" className="flex flex-wrap justify-center gap-2 md:gap-3">
                {[...galleryAlbums.map(({ id, title }) => ({ id, title })), { id: 'videos', title: 'Videos' }].map(album => (
                  <a
                    key={album.id}
                    href={`#${album.id}`}
                    className="px-4 py-2 rounded-full border border-[#D0D5DD] font-noto text-sm font-medium text-[#344054] hover:border-[#419372] hover:bg-[#E8F3EE] hover:text-[#1f5a43] transition-colors"
                  >
                    {album.title}
                  </a>
                ))}
              </nav>
            </div>
          </Container>
        </Section>

        {galleryAlbums.map((album, albumIndex) => (
          <Section key={album.id} spacing="md" bg={albumIndex % 2 === 0 ? 'gray' : 'white'}>
            <Container>
              <div id={album.id} className="max-w-6xl mx-auto scroll-mt-28">
                <FadeIn>
                  <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-2">{album.title}</h2>
                  <p className="font-noto text-base text-[#475467] mb-8">{album.description}</p>
                </FadeIn>
                {/* The first photo of each album is shown large */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:auto-rows-[180px] lg:auto-rows-[200px]">
                  {album.photos.map((photo, i) => (
                    <PhotoTile key={photo.src} photo={photo} large={i === 0} />
                  ))}
                </div>
              </div>
            </Container>
          </Section>
        ))}

        {/* Videos */}
        {videos.length > 0 && (
          <Section spacing="md" bg={galleryAlbums.length % 2 === 0 ? 'gray' : 'white'}>
            <Container>
              <div id="videos" className="max-w-6xl mx-auto scroll-mt-28">
                <FadeIn>
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
                    <div>
                      <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-2">Videos</h2>
                      <p className="font-noto text-base text-[#475467]">Community meetups, features and stories from the Avni YouTube channel</p>
                    </div>
                    <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-noto font-medium text-sm text-[#2a7559] hover:text-[#1f5a43]">
                      All videos on YouTube <ArrowUpRight size={14} />
                    </a>
                  </div>
                </FadeIn>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {videos.map(video => (
                    <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="group block">
                      <span className="relative block aspect-video rounded-xl overflow-hidden bg-[#EAECF0]">
                        {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnail */}
                        <img src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-colors">
                          <PlayCircle size={40} className="text-white drop-shadow" />
                        </span>
                      </span>
                      <span className="block font-noto text-xs text-[#667085] mt-2">
                        {new Date(video.published).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                      </span>
                      <span className="font-anek font-semibold text-sm leading-snug text-[#0b2540] group-hover:text-[#2a7559] line-clamp-2">
                        {video.title.replace(/\s*\|\s*Avni Project\s*$/i, '')}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </Container>
          </Section>
        )}
      </main>

      <Footer />
    </>
  );
}
