'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectMetadata from '@/components/projects/project-metadata';
import FadeIn from '@/components/fade-in';
import { PROJECTS } from '@/lib/constants';
import Image from 'next/image';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = PROJECTS.find((project) => project.slug === params.slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex justify-between items-center">
          <Button variant="outline" className="border-gray-800" asChild>
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All projects
            </Link>
          </Button>
          <Button variant="outline" className="border-gray-800" asChild>
            <a
              href={project.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Preview
            </a>
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-white">{project.title}</h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            {project.description}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <ProjectMetadata
          year={project.year}
          position={project.position}
          category={project.category}
          location={project.location}
        />
      </FadeIn>

      <FadeIn delay={0.6}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.images.map((image, index) => (
            <div key={index} className="relative aspect-video">
              <Image
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                fill
                className="object-cover rounded-lg border border-gray-800"
              />
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
