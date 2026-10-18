import { Trans, useTranslation } from 'react-i18next';
import { Fade } from '@/components/ui/Fade';
import { Mask } from '@/components/ui/Mask';
import { useReveal } from '@/hooks/useReveal';
import { cx } from '@/lib/css';
import type { Project } from '@/types/project';
import { ProjectArt } from './ProjectArt';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  reversed: boolean;
}

export function ProjectCard({ project, reversed }: ProjectCardProps) {
  const { t } = useTranslation();
  const [ref, revealed] = useReveal<HTMLElement>();
  const { id, href } = project;
  const titleLines = t(`projects.items.${id}.title`, { returnObjects: true });

  return (
    <article ref={ref} className={cx(styles.project, revealed && styles.revealed, reversed && styles.reversed)}>
      <ProjectArt project={project} revealed={revealed} />
      <div className={styles.copy}>
        <Fade className={styles.number}>{project.number} — {t(`projects.items.${id}.kicker`)}</Fade>
        <h3 className={styles.title}>
          {titleLines.map((line, i) => (
            <Mask key={line} delay={i * 80}>{line}</Mask>
          ))}
        </h3>
        <Fade as="p" className={styles.description} delay={150}>
          <Trans i18nKey={`projects.items.${id}.description`} components={{ b: <b /> }} />
        </Fade>
        <Fade className={styles.tags} delay={220}>
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </Fade>
        <Fade delay={280}>
          {href ? (
            <a className={styles.link} href={href} target="_blank" rel="noreferrer">
              {project.linkKind === 'repo' ? t('projects.viewRepo') : t('projects.tryLive')} <span>↗</span>
            </a>
          ) : (
            <span className={styles.linkPending}>{t('projects.repoSoon')}</span>
          )}
        </Fade>
      </div>
    </article>
  );
}
