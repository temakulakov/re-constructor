import { Fragment } from 'react';
import cx from 'clsx';

import { Link } from '~features/routing';
import { Container } from '~features/ui/components/Container';
import { Arrow } from '~features/ui/components/Arrow';
import { MouseOverBlock } from '~components/MouseOverBlock';
import { Typography } from '~features/ui/components/Typography';
import typographyClasses from '~features/ui/components/Typography/Typography.module.css';
import linkClasses from '~features/ui/components/Link/Link.module.css';
import classes from './Content.module.css';

type ContentProps = {
  title?: string;
  caption?: string;
  text?: string;
  link?: string;
};

export const Content = ({ title, caption, text, link }: ContentProps) => {
  const WrapperComponent = link ? MouseOverBlock : Fragment;
  const InnerWrapper = link ? Link : 'div';
  const isExternalLink = Boolean(link && link.startsWith('http'));

  return (
    <Container hasPadding={false}>
      <WrapperComponent>
        <InnerWrapper
          className={cx(
            classes.wrapper,
            Boolean(caption || link) && classes.wrapper_gap,
            link && classes.wrapper_link,
            linkClasses['link-box']
          )}
        >
          {link && (
            <Link route={link} className={linkClasses['link-overlay']} />
          )}
          {isExternalLink && <Arrow className={classes.arrow} />}
          {caption && <div className={classes.caption}>{caption}</div>}
          {title && (
            <Typography variant="h2" className={classes.title}>
              {title}
            </Typography>
          )}
          {text && (
            <div
              className={cx(
                typographyClasses['nested-text'],
                typographyClasses.p1,
                classes.text
              )}
            >
              {text}
            </div>
          )}
        </InnerWrapper>
      </WrapperComponent>
    </Container>
  );
};
