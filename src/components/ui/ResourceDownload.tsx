// Shared UI component.

import { cn } from '@/lib/utils';
import ExternalLink from '@/components/ui/ExternalLink';

type ResourceDownloadProps = {
  title: string;
  description: string;
  downloadUrl: string;
  viewUrl?: string;
  category?: string;
  className?: string;
  showDownload?: boolean;
};

// Render one resource card with view/download actions.
export default function ResourceDownload({
  title,
  description,
  downloadUrl,
  viewUrl,
  category,
  className,
  showDownload = true
}: ResourceDownloadProps) {
  // Base styles shared by both action buttons.
  const baseButton =
    'inline-flex min-w-[120px] items-center justify-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition shadow-[0_8px_20px_rgba(5,12,32,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70';
  const viewButton = cn(
    baseButton,
    'border border-primary/40 bg-white text-primary hover:border-primary hover:bg-white dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
  );
  const downloadButton = cn(
    baseButton,
    'bg-primary text-white hover:bg-primary/90 dark:bg-[#ffe800] dark:text-[#0429d2] dark:hover:bg-[#fbe000]'
  );

  return (
    <div
      className={cn(
        'space-y-4 rounded-3xl border border-white/20 bg-gradient-to-br from-white via-[#eef5ff] to-[#d9e8ff] p-6 text-[#0b1b3a] shadow-[0_20px_60px_rgba(8,16,38,0.18)] dark:border-white/10 dark:from-[rgba(12,18,40,0.95)] dark:via-[rgba(7,12,30,0.85)] dark:to-[rgba(5,9,23,0.9)] dark:text-white dark:shadow-[0_30px_80px_rgba(0,0,0,0.55)]',
        className
      )}
    >
      {category && (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#5a6b91] dark:text-white/50">
          {category}
        </p>
      )}
      <h3 className="text-xl font-semibold text-[#041034] dark:text-white">{title}</h3>
      <p className="text-sm text-[#32405f] dark:text-white/80">{description}</p>
      <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
        {viewUrl && (
          <ExternalLink href={viewUrl} className={viewButton}>
            View
          </ExternalLink>
        )}
        {showDownload && (
          <ExternalLink href={downloadUrl} className={downloadButton}>
            Download
          </ExternalLink>
        )}
      </div>
    </div>
  );
}
