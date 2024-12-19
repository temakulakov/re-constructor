import { Fragment } from 'react';
import cx from 'clsx';

import { formatAssetUrl } from '~utils/formatAssetUrl';
import { Arrow } from '~features/ui/components/Arrow';
import { MouseOverBlock } from '~components/MouseOverBlock';
import { Typography } from '~features/ui/components/Typography';
import { Link } from '~features/routing/components/Link';
import typographyClasses from '~features/ui/components/Typography/Typography.module.css';
import linkClasses from '~features/ui/components/Link/Link.module.css';
import classes from './DefaultBlock.module.css';

export type DefaultBlockProps = {
  title?: string;
  client?: string;
  description?: string;
  image?: string;
  tags?: string;
  caption?: string;
  link?: string;
  className?: string;
};

export const DefaultBlock = ({
  title,
  client,
  description,
  image,
  tags,
  caption,
  link,
  className,
}: DefaultBlockProps) => {
  const WrapperComponent = link ? MouseOverBlock : Fragment;
  const isExternalLink = Boolean(link && link.startsWith('http'));

  return (
    <WrapperComponent>
      <div className={cx(classes.item, linkClasses['link-box'], className)}>
        {link && <Link route={link} className={linkClasses['link-overlay']} />}
        {client && (
          <Typography variant="caption" className={classes.caption}>
            {client}
          </Typography>
        )}
        <div className={classes.block}>
          {title && (
            <Typography variant="h3" className={classes.title}>
              <span>{title}</span>
            </Typography>
          )}
          {isExternalLink && <Arrow className={classes.arrow} />}
          {description && <Typography variant="p2">{description}</Typography>}
          {caption && (
            <Typography
              variant="p2"
              className={cx(classes.caption, typographyClasses['nested-text'])}
            >
              {caption}
            </Typography>
          )}
          {tags && (
            <div
              className={cx(
                typographyClasses.p2,
                typographyClasses['nested-text']
              )}
            >
              {tags}
            </div>
          )}
          {image && (
            <img
              className={classes.image}
              src={formatAssetUrl({ url: image })}
              alt=""
            />
          )}
        </div>
      </div>
    </WrapperComponent>
  );
};
