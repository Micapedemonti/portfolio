import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParallax } from '@/hooks/useParallax';
import { useTilt } from '@/hooks/useTilt';
import { cx } from '@/lib/css';
import type { Project } from '@/types/project';
import { artVariants } from './art/variants';
import styles from './ProjectArt.module.css';

interface ProjectArtProps {
  project: Project;
  revealed: boolean;
}

export function ProjectArt({ project, revealed }: ProjectArtProps) {
  const { t } = useTranslation();
  const frameRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useParallax(frameRef, bgRef);
  useTilt(frameRef, panelRef);

  const Art = artVariants[project.art];
  const href = project.href;

  return (
    <div
      ref={frameRef}
      className={cx(styles.frame, revealed && styles.revealed, href && styles.clickable)}
      data-cursor="label"
      data-label={project.linkKind === 'repo' ? t('projects.cursorRepo') : t('projects.cursor')}
      onClick={href ? () => window.open(href, '_blank', 'noopener,noreferrer') : undefined}
    >
      <Art bgRef={bgRef} panelRef={panelRef} />
      <span className={cx(styles.tag, project.status === 'live' && styles.live, project.status === 'wip' && styles.wip)}>
        {t(`projects.status.${project.status}`)}
      </span>
      <span className={styles.caption}>{t(`projects.items.${project.id}.caption`)}</span>
    </div>
  );
}
