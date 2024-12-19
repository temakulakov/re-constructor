import { Container } from '~features/ui/components/Container';
import { Link } from '~features/ui/types';
import classes from './View.module.css';
import { Header } from '../Header';
import { Footer } from '../Footer';

type ViewProps = {
  children: React.ReactNode;
  navLinks?: Array<Link>;
  footerText?: string;
};

export const View = ({
  children,
  navLinks = [{ href: '/corp', title: 'Цифровые сотрудники' }],
  footerText = '© 2023, FINCH',
}: ViewProps) => {
  return (
    <div className={classes.wrapper}>
      <Container hasPadding={false}>
        <div className={classes.line} />
      </Container>
      <Header navLinks={navLinks} />
      <main className={classes.content}>{children}</main>
      <Footer navLinks={navLinks} text={footerText} />
      <Container hasPadding={false}>
        <div className={classes.line} />
      </Container>
    </div>
  );
};
