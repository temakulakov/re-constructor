import { Container } from '~features/ui/components/Container';
import { formatAssetUrl } from '~utils/formatAssetUrl';
import classes from './Hero.module.css';

type HeroProps = {
  title?: string;
  subtitle?: string;
  image?: string;
};

export const Hero = ({ title, subtitle, image }: HeroProps) => {
  const hasTextContent = title || subtitle;

  return (
    <>
      {hasTextContent && (
        <Container>
          <div className={classes.wrapper}>
            {title && (
              <h1 className={classes.title}>
                <span>{title}</span>
              </h1>
            )}
            {subtitle && <div className={classes.subtitle}>{subtitle}</div>}
          </div>
        </Container>
      )}
      <Container hasPadding={false}>
        {image && (
          <img
            className={classes.image}
            src={formatAssetUrl({ url: image })}
            alt={title || ''}
          />
        )}
      </Container>
    </>
  );
};
