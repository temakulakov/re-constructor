import { useState } from 'react';

import { Wrapper, Title, Text } from './styles';

type AccordionProps = {
  title: string;
  text: string;
};

export const Accordion = ({ title, text, ...props }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Wrapper {...props}>
      <Title onClick={toggle} isOpen={isOpen}>
        {title}
      </Title>
      <Text isShown={isOpen} dangerouslySetInnerHTML={{ __html: text }} />
    </Wrapper>
  );
};
