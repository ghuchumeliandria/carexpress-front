import type { FullReport } from '@/lib/api';

export function ImageGallery({ images }: { images: FullReport['images'] }) {
  if (!images.length) {
    return <p className="text-sm text-slate-500">No photos available from current providers.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {images.map((img, i) => (
        <a key={i} href={img.url} target="_blank" rel="noreferrer" className="group block">
          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.caption || 'Vehicle photo'}
              className="h-full w-full object-cover transition group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <p className="mt-1 truncate text-xs text-slate-500">{img.source}</p>
        </a>
      ))}
    </div>
  );
}
