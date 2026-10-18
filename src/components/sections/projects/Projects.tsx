import { useTranslation } from 'react-i18next';
import { Fade } from '@/components/ui/Fade';
import { Mask } from '@/components/ui/Mask';
import { projects } from '@/data/projects';
import { cx } from '@/lib/css';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.css';

export function Projects() {
  const { t } = useTranslation();
  const titleLines = t('projects.title', { returnObjects: true });

  return (
    <section className={cx('section', styles.projects)} id="work">
      <div className={styles.head}>
        <div>
          <Fade className="eyebrow">{t('projects.eyebrow')}</Fade>
          <h2 className={styles.title}>
            {titleLines.map((line, i) => (
              <Mask key={line} delay={i * 100}>{line}</Mask>
            ))}
          </h2>
        </div>
        <Fade as="p" className={styles.aside} delay={200}>
          {t('projects.aside')}
        </Fade>
      </div>

      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} reversed={i % 2 === 1} />
      ))}
    </section>
  );
}
