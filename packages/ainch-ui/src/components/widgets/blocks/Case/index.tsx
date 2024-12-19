import { Fragment } from 'react';
import cx from 'clsx';

import { Container } from '~features/ui/components/Container';
import { MouseOverBlock } from '~components/MouseOverBlock';
import { Link } from '~features/routing';
import { Arrow } from '~features/ui/components/Arrow';
import { Typography } from '~features/ui/components/Typography';
import typographyClasses from '~features/ui/components/Typography/Typography.module.css';
import linkClasses from '~features/ui/components/Link/Link.module.css';
import classes from './Case.module.css';

type CaseProps = {
  caption?: string;
  description?: string;
  title?: string;
  tags?: string;
  link?: string;
};

export const Case = ({
  caption,
  description,
  title,
  tags,
  link,
}: CaseProps) => {
  const WrapperComponent = link ? MouseOverBlock : Fragment;
  const isExternalLink = Boolean(link && link.startsWith('http'));

  return (
    <Container hasPadding={false}>
      <WrapperComponent>
        <div
          className={cx(
            classes.wrapper,
            Boolean(caption || link) && classes.wrapper_gap
          )}
        >
          {caption && (
            <Typography variant="caption" className={classes.caption}>
              {caption}
            </Typography>
          )}
          {isExternalLink && <Arrow className={classes.arrow} />}
          {title && (
            <div>
              <Typography variant="h2" inline>
                <span>{title}</span>
              </Typography>
            </div>
          )}
          <div>
            {description && (
              <div
                className={cx(
                  typographyClasses.p1,
                  typographyClasses['nested-text']
                )}
              >
                {description}
              </div>
            )}
            {tags && (
              <Typography variant="caption" className={classes.tag}>
                {tags}
              </Typography>
            )}
          </div>
          {link && (
            <Link route={link} className={linkClasses['link-overlay']} />
          )}
        </div>
      </WrapperComponent>
    </Container>
  );
};
