import { Container } from '~features/ui/components/Container';
import { Typography } from '~features/ui/components/Typography';
import classes from './Columns.module.css';

type ColumnsProps = { caption?: string; children: React.ReactNode };

export const Columns = ({ caption, children }: ColumnsProps) => {
  return (
    <Container hasPadding={false}>
      <div className={classes.wrapper}>
        {caption && (
          <Typography variant="caption" className={classes.caption}>
            {caption}
          </Typography>
        )}
        <ul className={classes.list}>
          {children?.filter(Boolean).map((child, index) => {
            return (
              <li key={index} className={classes.item}>
                {child}
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
};
