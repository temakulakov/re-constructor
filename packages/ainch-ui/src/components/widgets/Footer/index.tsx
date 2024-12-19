import { Link as LinkProps } from '~features/ui/types';
import { Link, routes } from '~features/routing';
import { Container } from '~features/ui/components/Container';
import { Logo } from '~features/ui/components/Logo';
import { Navigation } from '~features/ui/components/Navigation';
import classes from './Footer.module.css';

type FooterProps = {
  navLinks?: Array<LinkProps>;
  text?: string;
};

export const Footer = ({ navLinks, text }: FooterProps) => {
  return (
    <Container>
      <footer className={classes.footer}>
        <div>
          <Link className={classes['logo-wrapper']} route={routes.INDEX}>
            <Logo className={classes.logo} />
          </Link>
        </div>
        <Navigation navLinks={navLinks} />
        <div>{text && <div className={classes.copyright}>{text}</div>}</div>
      </footer>
    </Container>
  );
};
