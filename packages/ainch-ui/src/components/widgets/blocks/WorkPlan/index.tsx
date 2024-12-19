import cx from 'clsx';

import { AHowWeRoekBlock } from 'src/__generated__/graphql';
import { Container } from '~features/ui/components/Container';
import { Typography } from '~features/ui/components/Typography';
import typographyClasses from '~features/ui/components/Typography/Typography.module.css';
import classes from './WorkPlan.module.css';

type WorkPlanProps = AHowWeRoekBlock;

export const WorkPlan = ({
  caption,
  secondCaption,
  content,
  secondContent,
}: WorkPlanProps) => {
  return (
    <Container hasPadding={false}>
      <div className={classes.wrapper}>
        <div className={classes['workflow-block']}>
          <Typography variant="caption" className={classes.label}>
            {caption}
          </Typography>
          <ul className={classes['workflow-list']}>
            {content?.map((data, index) =>
              data ? (
                <li className={classes.item} key={index} route={data.link}>
                  {data.title && (
                    <Typography variant="h3" className={classes.title}>
                      <span>{data.title}</span>
                    </Typography>
                  )}
                  {data.text && (
                    <div
                      className={cx(
                        typographyClasses.p2,
                        typographyClasses['nested-text']
                      )}
                      dangerouslySetInnerHTML={{ __html: data.text }}
                    />
                  )}
                </li>
              ) : null
            )}
          </ul>
        </div>
        <div className={classes['direction-block']}>
          <Typography variant="caption" className={classes.label}>
            {secondCaption}
          </Typography>
          <ul className={classes['direction-list']}>
            {secondContent?.map((data, index) =>
              data ? (
                <li className={classes.item} key={index} route={data.link}>
                  <span className={classes.counter}>
                    {index < 9 ? `0${index + 1}` : `${index + 1}`}
                  </span>
                  <Typography variant="h3" className={classes.title}>
                    <span>{data.title}</span>
                  </Typography>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </Container>
  );
};
